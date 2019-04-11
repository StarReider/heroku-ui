function updateLeaderBoard() {
	$.ajax({
		url : GATEWAY_SERVER_URL + "/leaders",
		crossDomain: true
	}).then(
			function(data) {
				$('#leaderboard-body').empty();
				data.forEach(function(row) {
					$('#leaderboard-body').append(
							'<tr><td>' + row.userId + '</td>' + '<td>'
									+ row.totalScore + '</td>');
				});
			});
}

function updateStats(userId) {
	$.ajax({
		url : GATEWAY_SERVER_URL + "/stats?userId=" + userId,
		crossDomain: true,
		success : function(data) {
			$('#stats-div').show();
			$('#stats-user-id').empty().append(userId);
			$('#stats-score').empty().append(data.score);
			$('#stats-badges').empty().append(data.badges.join());
		},
		error : function(data) {
			$('#stats-div').show();
			$('#stats-user-id').empty().append(userId);
			$('#stats-score').empty().append(0);
			$('#stats-badges').empty();
		}
	});
}

$(document).ready(function() {
	updateLeaderBoard();
	$("#refresh-leaderboard").click(function(event) {
		updateLeaderBoard();
	});
});