package apis

import (
	"querier/utils"
	"encoding/json"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func GetInventory(c *gin.Context) {
	var url = os.Getenv("INVENTORY_SERVICE_ROOT_URL")+"/api/inventory/all"
	var token = "rahasia"

	err, bodyBytes := utils.GetRequest(c, url, "inventory", token)
	if err != nil {
		log.Error().Msg(err.Error())
		c.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
			"success": false,
		})
		return
	}
	var responseObject InventoryResponse
	json.Unmarshal(bodyBytes, &responseObject)

	c.JSON(http.StatusOK, gin.H{
		"inventory": responseObject.Data,
	})
}

func GetMember(c *gin.Context) {
	var url = os.Getenv("MEMBER_SERVICE_ROOT_URL")+"/api/member/all"
	var token = "rahasia"

	err, bodyBytes := utils.GetRequest(c, url, "member", token)
	if err != nil {
		log.Error().Msg(err.Error())
		c.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
			"success": false,
		})
		return
	}
	var responseObject MemberResponse
	json.Unmarshal(bodyBytes, &responseObject)

	c.JSON(http.StatusOK, gin.H{
		"member": responseObject.Data,
	})
}

func GetQuerier(c *gin.Context) {
	var inventoryUrl = os.Getenv("INVENTORY_SERVICE_ROOT_URL")+"/api/inventory/all"
	var memberUrl = os.Getenv("MEMBER_SERVICE_ROOT_URL")+"/api/member/all"
	var token = "rahasia"

	// get inventory
	err, inventoryBodyBytes := utils.GetRequest(c, inventoryUrl, "inventory", token)
	if err != nil {
		log.Error().Msg(err.Error())
		c.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
			"success": false,
		})
		return
	}
	var inventoryResponseObject InventoryResponse
	json.Unmarshal(inventoryBodyBytes, &inventoryResponseObject)
	*&inventoryResponseObject.Total = len(inventoryResponseObject.Data)

	// get member
	err, memberBodyBytes := utils.GetRequest(c, memberUrl, "member", token)
	if err != nil {
		log.Error().Msg(err.Error())
		c.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
			"success": false,
		})
		return
	}
	var memberResponseObject MemberResponse
	json.Unmarshal(memberBodyBytes, &memberResponseObject)
	*&memberResponseObject.Total = len(memberResponseObject.Data)

	// return response
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
		"backend": "go-1.19.4",
		"version": "v0.3",
		"member": memberResponseObject,
		"inventory": inventoryResponseObject,
	})
}