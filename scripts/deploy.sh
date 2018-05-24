docker push "${IMAGE_NAME_BACKEND}:latest" && docker push "${IMAGE_NAME_BACKEND}:${version}"
docker push "${IMAGE_NAME_WEBUI}:latest" && docker push "${IMAGE_NAME_WEBUI}:${version}"