// task 1
function log(arg) {
  console.log(arg);
}

function debounce(fn, ms) {
  var time;
    return function (val) {
        if (time) {
            clearTimeout(time);
        }     
        time = setTimeout(function() { fn(val) }, ms);
    }
}

var debounce = debounce(log, 500);

debounce(1);
debounce(2);
debounce(3);



// task 2
function timer(ms) {
  return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

// task 3 
function getJsonAsync(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
         
        xhr.open('GET', url);
         
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject("Error");
            }
        }
         
        xhr.onerror = () => {
            reject("Error");
        };
         
        xhr.send();
    });
}

 

// task 4 
function request(url) { 
    return new Promise((res) => {

	    const delayTime = Math.floor(Math.random() * 10000) + 1;
		
		setTimeout(() => res(url), delayTime);
    });
}
 
function resolveUrlsArray(urls) { 
    var promisesArray = urls.map(function (url) {
        return request(url);
	});
	
    var resultArray = [];
 
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < promisesArray.length; i++) {
            promisesArray[i]
                .then(function (res) {
                    resultArray.push(res);
                    if (resultArray.length === promisesArray.length) resolve(resultArray);
                })
 
                .catch(function (error) {
	                reject(error);
                });
        }
    })
}