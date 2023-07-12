kubectl apply -f ./langua_lexic_micro_db/langua_lexic_micro_db.config.yaml
kubectl apply -f ./langua_lexic_micro_db/langua_lexic_micro_db.yaml

kubectl apply -f ./langua_user_micro_db/langua_user_micro_db.config.yaml
kubectl apply -f ./langua_user_micro_db/langua_user_micro_db.yaml

kubectl apply -f ./lexic_microservice/lexic_microservice.config.yaml
kubectl apply -f ./lexic_microservice/lexic_microservice.yaml

kubectl apply -f ./material_microservice/material_microservice.config.yaml
kubectl apply -f ./material_microservice/material_microservice.yaml

kubectl apply -f ./user_microservice/user_microservice.config.yaml
kubectl apply -f ./user_microservice/user_microservice.yaml

kubectl apply -f ./user-stats_microservice/user-stats_microservice.config.yaml
kubectl apply -f ./user-stats_microservice/user-stats_microservice.yaml

kubectl apply -f ./langua_api_gateway/langua_api_gateway.config.yaml
kubectl apply -f ./langua_api_gateway/langua_api_gateway.yaml