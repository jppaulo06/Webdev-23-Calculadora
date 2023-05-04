
const calculator = {
  numbers: [],
  operations: {
    add: undefined,
    sub: undefined,
    mult: undefined,
    equal: undefined,
    reset: undefined,
    backspace: undefined,
  },
  panel: undefined,
  panel_string: "",
  error: ""
}

get_buttons();
define_buttons_events();

function get_buttons() {
  get_numbers();
  get_operations();
  get_panel();
}

function get_numbers () {
  for(let i = 0; i < 10; i++){
    calculator.numbers[i] = document.getElementById(i);
  }
}

function get_operations() {
  calculator.operations = {
    add: document.querySelector('#add'),
    sub: document.querySelector('#sub'),
    mult: document.querySelector('#mult'),
    equal: document.querySelector('#equal'),
    reset: document.querySelector('#reset'),
    backspace: document.querySelector('#backspace')
  }
}

function get_panel() {
  calculator.panel = document.querySelector('#panel');
}

function define_buttons_events() {
  define_numbers_events();
  define_operations_events();
}

function define_numbers_events() {
  for(let i = 0; i < 10; i++){
    calculator.numbers[i].addEventListener(
      "click", () => add_to_panel_char(i + '')
    );
  }
}

function define_operations_events() {
  define_add_event();
  define_sub_event();
  define_mult_event();
  define_equal_event();
  define_reset_event();
  define_backspace_event();
}

function define_add_event() {
  const add_button = calculator.operations.add;
  add_button.addEventListener(
    "click", () => add_to_panel_char('+')
  );
  add_button.addEventListener(
    "keypress", (e) => e.key === '+' && add_to_panel_char('+')
  );
}

function define_sub_event() {
  const sub_button = calculator.operations.sub;
  sub_button.addEventListener(
    "click", () => add_to_panel_char('-')
  );
  sub_button.addEventListener(
    "keypress", (e) => e.key === '-' && add_to_panel_char('-')
  );
}

function define_mult_event() {
  const mult_button = calculator.operations.mult;
  mult_button.addEventListener(
    "click", () => add_to_panel_char('*')
  );
  mult_button.addEventListener(
    "keypress", (e) => e.key === '*' && add_to_panel_char('*')
  );
}

function define_equal_event() {
  const equal_button = calculator.operations.equal;
  equal_button.addEventListener(
    "click", () => put_result_in_panel()
  );
  equal_button.addEventListener(
    "keypress", (e) => e.key === '=' && put_result_in_panel()
  );
}

function define_reset_event() {
  const reset_button = calculator.operations.reset;
  reset_button.addEventListener(
    "click", () => reset_panel()
  );
}

function define_backspace_event() {
  const backspace_button = calculator.operations.backspace;
  backspace_button.addEventListener(
    "click", () => remove_last_char()
  );
  backspace_button.addEventListener(
    "keypress", (e) => e.key === 'Backspace' && remove_last_char()
  );
}

function add_to_panel_char(c){
  calculator.panel_string += c;
  refresh_panel();
}

function put_result_in_panel() {
  try {
    calculator.panel_string = String(eval(calculator.panel_string) || "");
  }
  catch {
    calculator.error = "Sintaxe inválida!";
  }
  refresh_panel();
}

function reset_panel() {
  calculator.panel_string = "";
  refresh_panel();
}

function remove_last_char() {
  calculator.panel_string = calculator.panel_string
    .slice(0, calculator.panel_string.length - 1);
  refresh_panel();
}

function refresh_panel() {
  if(calculator.error){
    calculator.panel.innerText = calculator.error;
    setTimeout(() => {
      calculator.panel.innerText = calculator.panel_string;
      calculator.error = "";
    }, 1000)
  }
  else {
    calculator.panel.innerText = calculator.panel_string;
  }
}
