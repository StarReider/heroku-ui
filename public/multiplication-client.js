function updateMultiplication() {
	$.ajax({
		url : GATEWAY_SERVER_URL + "/multiplications/random",
		crossDomain: true
	}).then(function(data) {
		// Cleans the form
		$("#attempt-form").find("input[name='result-attempt']").val("");
		$("#attempt-form").find("input[name='user-alias']").val("");

		// Gets a random challenge from API and loads the data in the HTML
		$('.multiplication-a').empty().append(data.factorA);
		$('.multiplication-b').empty().append(data.factorB);
	});
}

function updateResults(alias) {
	var userId = -1;
	$.ajax({
		async : false,
		url : GATEWAY_SERVER_URL + "/results?alias=" + alias,
		crossDomain: true,
		success : function(data) {
			$('#results-div').show();
			$('#results-body').empty();
			data.forEach(function(row) {
				$('#results-body').append(
						'<tr><td>' + row.id +

						'</td>' +

						'<td>' + row.multiplication.factorA + ' x '
								+ row.multiplication.factorB + '</td>' + '<td>'
								+ row.resultAttempt + '</td>' + '<td>'
								+ (row.correct === true ? 'YES' :

								'NO') + '</td></tr>');

			});
			userId = data[0].user.id;
		}
	});
	return userId;
}

$(document).ready(function() {
	updateMultiplication();

	$("#attempt-form").submit(function(event) {
		
		// Don't submit the form normally
		event.preventDefault();

		// Get some values from elements on the
		// page
		var a = $('.multiplication-a').text();
		var b = $('.multiplication-b').text();
		var $form = $(this), attempt = $form
				.find("input[name='result-attempt']").val(), 
				userAlias = $form.find("input[name='user-alias']").val();

		// Compose the data in the format that
		// the API is expecting
		var data = {
			user : {
				alias : userAlias
			},
			multiplication : {
				factorA : a,
				factorB : b
			},
			resultAttempt : attempt
		};

		// Send the data using post
		$.ajax({
			url : GATEWAY_SERVER_URL + '/results',
			type : 'POST',
			data : JSON.stringify(data),
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			crossDomain: true,
			success : function(result) {
				if (result.correct) {
					$('.result-message')
							.empty()
							.append("The result is correct! Congratulations!");
				} else {
					$('.result-message')
							.empty()
							.append("Oops that's not correct! But keep trying!");
				}
			}
		});

		updateMultiplication();

		setTimeout(function(){
			var userId = updateResults(userAlias);
			updateStats(userId);
			updateLeaderBoard();
		}, 300);
	});
});