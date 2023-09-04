package middlewares

import (
	"querier/auth"
	"github.com/gin-gonic/gin"
)

var (
	arr []string

)

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		secretString := c.GetHeader("token")
		if secretString == "" {
			c.JSON(401, gin.H{
				"status": "Unauthorized",
				"message": "No Secret, Access denied. Please Specify Token for a Call",
				"success": false,
			})
			c.Abort()
			return
		}
		err := auth.ValidateToken(secretString)
		if err != nil {
			c.JSON(401, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}
		c.Next()
	}
}