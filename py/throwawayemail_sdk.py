# ThrowawayEmail SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import ThrowawayEmailUtility
from core.spec import ThrowawayEmailSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import ThrowawayEmailBaseFeature
from features import _make_feature


class ThrowawayEmailSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = ThrowawayEmailUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ThrowawayEmailUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ThrowawayEmailSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def dns_query(self):
        """Idiomatic facade: client.dns_query.list() / client.dns_query.load({"id": ...})."""
        from entity.dns_query_entity import DnsQueryEntity
        cached = getattr(self, "_dns_query", None)
        if cached is None:
            cached = DnsQueryEntity(self, None)
            self._dns_query = cached
        return cached

    def DnsQuery(self, data=None):
        # Deprecated: use client.dns_query instead.
        from entity.dns_query_entity import DnsQueryEntity
        return DnsQueryEntity(self, data)


    @property
    def domain(self):
        """Idiomatic facade: client.domain.list() / client.domain.load({"id": ...})."""
        from entity.domain_entity import DomainEntity
        cached = getattr(self, "_domain", None)
        if cached is None:
            cached = DomainEntity(self, None)
            self._domain = cached
        return cached

    def Domain(self, data=None):
        # Deprecated: use client.domain instead.
        from entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    @property
    def email(self):
        """Idiomatic facade: client.email.list() / client.email.load({"id": ...})."""
        from entity.email_entity import EmailEntity
        cached = getattr(self, "_email", None)
        if cached is None:
            cached = EmailEntity(self, None)
            self._email = cached
        return cached

    def Email(self, data=None):
        # Deprecated: use client.email instead.
        from entity.email_entity import EmailEntity
        return EmailEntity(self, data)


    @property
    def list(self):
        """Idiomatic facade: client.list.list() / client.list.load({"id": ...})."""
        from entity.list_entity import ListEntity
        cached = getattr(self, "_list", None)
        if cached is None:
            cached = ListEntity(self, None)
            self._list = cached
        return cached

    def List(self, data=None):
        # Deprecated: use client.list instead.
        from entity.list_entity import ListEntity
        return ListEntity(self, data)


    @property
    def resolve(self):
        """Idiomatic facade: client.resolve.list() / client.resolve.load({"id": ...})."""
        from entity.resolve_entity import ResolveEntity
        cached = getattr(self, "_resolve", None)
        if cached is None:
            cached = ResolveEntity(self, None)
            self._resolve = cached
        return cached

    def Resolve(self, data=None):
        # Deprecated: use client.resolve instead.
        from entity.resolve_entity import ResolveEntity
        return ResolveEntity(self, data)


    @property
    def v2n(self):
        """Idiomatic facade: client.v2n.list() / client.v2n.load({"id": ...})."""
        from entity.v2n_entity import V2nEntity
        cached = getattr(self, "_v2n", None)
        if cached is None:
            cached = V2nEntity(self, None)
            self._v2n = cached
        return cached

    def V2n(self, data=None):
        # Deprecated: use client.v2n instead.
        from entity.v2n_entity import V2nEntity
        return V2nEntity(self, data)


    @property
    def v3n(self):
        """Idiomatic facade: client.v3n.list() / client.v3n.load({"id": ...})."""
        from entity.v3n_entity import V3nEntity
        cached = getattr(self, "_v3n", None)
        if cached is None:
            cached = V3nEntity(self, None)
            self._v3n = cached
        return cached

    def V3n(self, data=None):
        # Deprecated: use client.v3n instead.
        from entity.v3n_entity import V3nEntity
        return V3nEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
