package utils

import (
	"errors"
	"io"
	"net/http"
	"time"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetRequest(c *gin.Context, url string, svc string, token string) (err error, b []byte) {
	client := &http.Client{
		Timeout: time.Second * 10,
	}
	
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		err = errors.New("error when hitting " + svc + " service")
		return err, nil
	}
	req.Header.Set("token", token)
	res, err := client.Do(req)
	if err != nil {
		err = errors.New("error when request to " + svc + " service")
		return err, nil
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		err = errors.New("got status code " + strconv.Itoa(res.StatusCode) + " from " + svc + " service")
		return err, nil
	}

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		err = errors.New("error when reading response body")
		return err, nil
	}

	return nil, bodyBytes
}