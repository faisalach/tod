window.onload = () => {
	let modalOptions = new bootstrap.Modal(document.getElementById('modalOption'));

	// modalOptions.show();

	function list(title,type) {
		let html 	= `
		<li class="list-group-item d-flex justify-content-between align-items-center" data-title="${title}">
			${title}
			<button type="button" class="btn-close btn-sm btnRemoveList"></button>
		</li>
		`;
		document.getElementById("list_"+type).insertAdjacentHTML('beforeend', html);
		document.querySelectorAll('.btnRemoveList').forEach((e) => {
			e.addEventListener('click',remove_list,false);
		});
	}
	function submit_list(event) {
		event.preventDefault();
		let target 	= event.target;
		let type 	= target.dataset.type;
		let input 	= document.getElementById('input_'+type);
		let title 	= input.value;
		if (title != '') {
			input.value 	= '';
			list(title,type);
		}
	}
	document.querySelectorAll('.btnSubmitList').forEach((e) => {
		e.addEventListener('click',submit_list,false);
	});
	function remove_list(event) {
		event.preventDefault();
		let target 	= event.target;
		target.parentElement.outerHTML = '';
	}
	document.querySelectorAll('.btnRemoveList').forEach((e) => {
		e.addEventListener('click',remove_list,false);
	});

	function random_number(array_count) {
		let random 	= Math.random();
		return Math.floor(random * array_count);
	}

	function get_items(parent) {
		let items 	= document.getElementById(parent);
		let children 	= items.children;
		let item_arr 	= [];
		for (let i = 0; i < children.length; i++) {
			let child 	= children[i];
			let item 	= child.dataset.title;
			item_arr.push(item);
		}
		return item_arr;
	}
	function rotate(array,element_id,choice,duration) {
		let element 	= document.getElementById(element_id);
		let count_arr 	= array.length;
		let now 		= 0;
		element.classList.add('active');
		let interval 		= setInterval( () => {
			setTimeout(() => {
				if (element.innerHTML == choice) {
					return false;
				}
				element.innerHTML 	= choice;
				clearInterval(interval);

				if (element_id == 'challenge_selected') {
					document.getElementById('btnStart').disabled = false;
					document.getElementById('btnModal').disabled = false;
				}
			}, duration * 1000);
			element.innerHTML 	= `<span>${array[now]}</span>`;
			now++;
			if (now == count_arr) {
				now 	= 0;
			}
		}, 150);

		// console.log(interval);
	}

	function start(e) {
		e.preventDefault();
		let players 	= get_items('list_player');
		let truths 		= get_items('list_truth');
		let dares 		= get_items('list_dare');
		let truth_dares	= ['Truth','Dare'];
		let concat 		= truths.concat(dares);

		let player 		= players[random_number(players.length)];
		let truth 		= truths[random_number(truths.length)];
		let dare 		= dares[random_number(dares.length)];
		let truth_dare 	= truth_dares[random_number(truth_dares.length)];

		rotate(truth_dares,'truth_dare',truth_dare,5);
		rotate(players,'player_selected',player,8);
		rotate(concat,'challenge_selected',truth_dare.toLowerCase() == 'truth' ? truth : dare,10);

		document.getElementById('btnStart').disabled = true;
		document.getElementById('btnModal').disabled = true;

	}

	let button_start 	= document.getElementById('btnStart');
	btnStart.addEventListener('click',start);

	
}