/** this is a callback hell **/

function doTasks(){
	setTimeout(function(){
		console.log('task 1');
		setTimeout(function(){
			console.log('task 2');
			setTimeout(function(){
				console.log('task 3');
				setTimeout(function(){
					console.log('task 4');
				}, 800)
			}, 700)
		}, 600)
	}, 500)
}

doTasks()