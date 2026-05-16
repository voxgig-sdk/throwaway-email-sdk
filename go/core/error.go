package core

type ThrowawayEmailError struct {
	IsThrowawayEmailError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewThrowawayEmailError(code string, msg string, ctx *Context) *ThrowawayEmailError {
	return &ThrowawayEmailError{
		IsThrowawayEmailError: true,
		Sdk:              "ThrowawayEmail",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ThrowawayEmailError) Error() string {
	return e.Msg
}
