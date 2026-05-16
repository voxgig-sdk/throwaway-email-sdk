<?php
declare(strict_types=1);

// ThrowawayEmail SDK base feature

class ThrowawayEmailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ThrowawayEmailContext $ctx, array $options): void {}
    public function PostConstruct(ThrowawayEmailContext $ctx): void {}
    public function PostConstructEntity(ThrowawayEmailContext $ctx): void {}
    public function SetData(ThrowawayEmailContext $ctx): void {}
    public function GetData(ThrowawayEmailContext $ctx): void {}
    public function GetMatch(ThrowawayEmailContext $ctx): void {}
    public function SetMatch(ThrowawayEmailContext $ctx): void {}
    public function PrePoint(ThrowawayEmailContext $ctx): void {}
    public function PreSpec(ThrowawayEmailContext $ctx): void {}
    public function PreRequest(ThrowawayEmailContext $ctx): void {}
    public function PreResponse(ThrowawayEmailContext $ctx): void {}
    public function PreResult(ThrowawayEmailContext $ctx): void {}
    public function PreDone(ThrowawayEmailContext $ctx): void {}
    public function PreUnexpected(ThrowawayEmailContext $ctx): void {}
}
