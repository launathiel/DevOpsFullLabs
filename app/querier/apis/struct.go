package apis

import (
	"time"
)

type Querier struct {
	Message string `json:"message"`
	Backend string `json:"backend"`
	Member  struct {
		Total int `json:"total"`
		Data  []struct {
			ID        int    `json:"_id"`
			FirstName string `json:"firstName"`
			LastName  string `json:"lastName"`
			Company   string `json:"company"`
			Age       int    `json:"age"`
			City      string `json:"city"`
		} `json:"data"`
	} `json:"member"`
	Inventory struct {
		Total int `json:"total"`
		Data  []struct {
			ID          int    `json:"_id"`
			Name        string `json:"name"`
			Category    string `json:"category"`
			Description string `json:"description"`
			Price       int    `json:"price"`
			Qty         int    `json:"qty"`
		} `json:"data"`
	} `json:"inventory"`
}

type InventoryResponse struct {
	Total int
	Data    []struct {
		ID          int       `json:"_id"`
		Name        string    `json:"name"`
		Category    string    `json:"category"`
		Description string    `json:"description"`
		Price       int       `json:"price"`
		Qty         int       `json:"qty"`
		CreatedAt   time.Time `json:"createdAt"`
	} `json:"data"`
}

type MemberResponse struct {
	Total int
	Data    []struct {
		ID        int       `json:"_id"`
		FirstName string    `json:"firstName"`
		LastName  string    `json:"lastName"`
		Company   string    `json:"company"`
		Age       int       `json:"age"`
		City      string    `json:"city"`
		CreatedAt time.Time `json:"createdAt"`
	} `json:"data"`
}