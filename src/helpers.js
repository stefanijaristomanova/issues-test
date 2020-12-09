let API = {

    request(method, url, data, authCheck) {
        if (null == authCheck) {
            // if (!Storage.getToken()) {
            //     window.location = "/auth/login";
            // }
        }

        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open(method, url);
            req.setRequestHeader('Content-Type', 'application/json');
            // req.setRequestHeader('Authorization', (null == authCheck ? 'Bearer ' : '') + Storage.getToken());
            req.onload = () => {
                setTimeout(() => {
                }, 1000);
                var responseReplaced = req.response.replace(/templateID"([[:])?(\d+)([,}\]])/g, "templateID\"$1\"$2\"$3");

                if (req.status == 200 || req.status == 201 || req.status == 204 || req.statusText == "OK") {
                    if (isJsonString(req.response)) {
                        resolve(JSON.parse(responseReplaced));
                    } else {
                        resolve(req.response);
                    }
                }
            }
            req.onerror = () => {
                const error = 'Failed to complete the XMLHttpRequest';

                reject(error);
            }
            req.send(JSON.stringify(data));
        })
    },

    get(id) {
        return this.request("GET", "http://localhost:8080/api/v1/issue-service/issues"  + (id === undefined ? "" : "/" + id));
    },
    add(model, id) {
        return this.request("POST", `http://localhost:8080/api/v1/issue-service/issues ${id === undefined ? "" : "/" + id}`, model);
    },

    update(templateId, model) {
        return this.request("POST", "http://localhost:8080/api/v1/issue-service/issues"  + '/' + templateId, model);
    },

    delete(id) {
        return this.request("DELETE", `http://localhost:8080/api/v1/issue-service/issues/${id}`);
    },


}
export default API