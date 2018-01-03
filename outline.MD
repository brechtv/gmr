// GLOBAL VARS
var turn = 0;
var player, ai_player_1, ai_player_2, ai_player_3; // has { player_name, player_id }
var player_pool = PLAYERS;
var starting_provinces_pool = [6,13,2,7,20,26,8,15]; // random bigger cities, spread out

function choose_player(player_id) {
  // select player
  player = PLAYERS.filter(function(el) { return el.player_id === player_id });
  // assign remaining players to ai player
  var other_players = PLAYERS.filter(function(el) { return el.player_id != player_id });
  // standard of three ai players
  ai_player_1 = other_players[1];
  ai_player_2 = other_players[2];
  ai_player_3 = other_players[3];
}

function start_game() {
  select_starting_province()
  player_add_troops()
  computer_select_starting_province()
  computer_add_troops()





  function select_starting_province() {}
  function player_add_troops() {}
  function computer_select_starting_province() {}
  function computer_add_troops() {}
  end_turn()
}

function turn() {
  function reinforce_province() {} // Own region click
  function transfer_province() {} // Own region click > Own region click
  function attack_province() {}// Own region click > Other region click
  end_turn()
}

function computer_turn() {
  function reinforce_province() {}
  function transfer_province() {}
  function attack_province() {}
  end_turn()
}

function end_turn() {
  if(turn <= 100) {
    computer_turn();
    turn();
  } else {
    end_game();
  }
}

function end_game() {}
