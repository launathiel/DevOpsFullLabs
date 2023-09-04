package auth

import (
	"errors"
)

var secret string = "rahasia"

func ValidateToken(userSecret string) (err error) {
	if userSecret == secret {
		return
	}
	return errors.New("invalid token")
}