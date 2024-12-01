function activity2() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <p>Learning Objective: Calculate steady state temperature of the radiation shield </p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act2();' id='temp-btn-3'>Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML += text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function start_act2() {
    let temp_btn = document.getElementById('temp-btn-3');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Caculate steady state temperature of radiation shield", "tb2-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb2-box'>
        <p style="font-size: 24px; font-weight: 600; text-align: center">Activity 2</p> <br>
        <h5> Two long planes A &amp; B are maintained at ${act2_ta_val}<sup>o</sup>K &amp; ${act2_tb_val}<sup>o</sup>K and with emissivity of ${act2_epsa} and ${act2_epsb} respectively. Two thin radiation shields C &amp; D having emissivities ${act2_epsc} &amp; ${act2_epsd} are placed between A &amp; B. Find the steady state temperature of C &amp; D.</h5>
        <br>
        <div style='text-align: center;'><img style='width: 30%;' src='./images/activity2.png'></div>
        <br><br>

        <div id="act1-Ques1-div">
         
        </div>

        <div id="act2_qa" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ \\frac{Q}{A} = $$
                </span>
                <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal05-inp'> <span id='cal05-val-sp'></span> w/m<sup>2</sup>
                
                <button class='btn btn-info std-btn' onclick='verify_act2_qa();' id='btn_act2_qa' style="width:30%">Verify</button>
            </p>
        </div>

        <div id="act2_surc" style="display: none">
            <h5>For surface C (A-C)</h5>
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ \\frac{Q}{A} = \\frac{\\sigma(T_A^4 - T_C^4)}{(\\frac{1}{\\epsilon_A} + \\frac{1}{\\epsilon_C} - 1)} $$
                    $$ T_C = (\\frac{- \\frac{Q}{A} (\\frac{1}{\\epsilon_A} + \\frac{1}{\\epsilon_C} - 1)}{\\sigma} + T_A^4)^{\\frac{1}{4}} $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal06-inp'> <span id='cal06-val-sp'></span> <sup>o</sup>K

                <button class='btn btn-info std-btn' onclick='verify_act2_surc();' id='btn_act2_surc' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act2_surb" style="display: none">
            <h5>For surface B (D-B)</h5>
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ \\frac{Q}{A} = \\frac{\\sigma(T_D^4 - T_B^4)}{(\\frac{1}{\\epsilon_D} + \\frac{1}{\\epsilon_B} - 1)} $$
                    $$ T_D = (\\frac{\\frac{Q}{A} (\\frac{1}{\\epsilon_D} + \\frac{1}{\\epsilon_B} - 1)}{\\sigma} + T_B^4)^{\\frac{1}{4}} $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal07-inp'> <span id='cal07-val-sp'></span> <sup>o</sup>K

                <button class='btn btn-info std-btn' onclick='verify_act2_surb();' id='btn_act2_surb' style="width:20%">Verify</button>
            </p>
        </div>

    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations1();
    setTimeout(() => { show_step('tb2-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    let ques = `
      Q. Draw electrical analogy on paper and select correct option for Q/A. 
   `;
    let q_div = document.getElementById('act1-Ques1-div');
    let question = new Question_Options(ques, ['$$ \\frac{\\sigma (T_A^4 - T_B^4)}{(\\frac{1}{\\epsilon_A} + \\frac{1}{\\epsilon_B} - 1) + (\\frac{2}{\\epsilon_C} - 1) + (\\frac{2}{\\epsilon_D} - 1)} $$',
        '$$ \\frac{\\sigma (T_A^4 - T_B^4)}{(\\frac{1}{\\epsilon_A} + \\frac{1}{\\epsilon_B} - 1) + (\\frac{1}{\\epsilon_C} - 1) + (\\frac{1}{\\epsilon_D} - 1)} $$',
        '$$ \\frac{\\sigma (T_A^4 - T_B^4)}{(\\frac{2}{\\epsilon_A} + \\frac{2}{\\epsilon_B} - 1) + (\\frac{2}{\\epsilon_C} - 1) + (\\frac{2}{\\epsilon_D} - 1)} $$',
        '$$ \\frac{\\sigma (T_A^4 - T_B^4)}{(\\frac{2}{\\epsilon_A} + \\frac{1}{\\epsilon_B} - 1) + (\\frac{2}{\\epsilon_C} - 1) + (\\frac{1}{\\epsilon_D} - 1)} $$'], '1', q_div, 'act1-ques1', a2_load_qa);
    question.load_question();
    question.get_question_element().querySelector('h5').style.fontSize = '20px';
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function internal_calculations1() {
    act2_qa = (sigma * (Math.pow(act2_ta_val, 4) - Math.pow(act2_tb_val, 4))) / (((1 / act2_epsa) + (1 / act2_epsb) - 1) + ((2 / act2_epsc) - 1) + ((2 / act2_epsd) - 1));
    act2_tc = Math.pow((((-act2_qa * ((1 / act2_epsa) + (1 / act2_epsc) - 1)) / sigma) + Math.pow(act2_ta_val, 4)), (1.0 / 4.0));
    act2_td = Math.pow((((act2_qa * ((1 / act2_epsd) + (1 / act2_epsb) - 1)) / sigma) + Math.pow(act2_tb_val, 4)), (1.0 / 4.0));
    console.log("act2 Q/A= ", act2_qa);
    console.log("act2 TC= ", act2_tc);
    console.log("act2 TD= ", act2_td);
}
function a2_load_qa() {
    let div = document.getElementById('act2_qa');
    div.style.display = 'block';
}
function verify_act2_qa() {
    let btn = document.getElementById('btn_act2_qa');
    let div = document.getElementById('act2_surc');
    let inp05 = document.getElementById('cal05-inp');
    let sp05 = document.getElementById('cal05-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp05.value).toFixed(3)), parseFloat(act2_qa.toFixed(3)))) {
        alert('Q/A value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp05.remove();
    sp05.innerText = `${(act2_qa).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act2_surc() {
    let btn = document.getElementById('btn_act2_surc');
    let div = document.getElementById('act2_surb');
    let inp06 = document.getElementById('cal06-inp');
    let sp06 = document.getElementById('cal06-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp06.value).toFixed(3)), parseFloat(act2_tc.toFixed(3)))) {
        alert('Temperature for surface C is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp06.remove();
    sp06.innerText = `${(act2_tc).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act2_surb() {
    let btn = document.getElementById('btn_act2_surb');
    let inp7 = document.getElementById('cal07-inp');
    let sp7 = document.getElementById('cal07-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp7.value).toFixed(3)), parseFloat(act2_td.toFixed(3)))) {
        alert('Temperature for surface D is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp7.remove();
    sp7.innerText = `${(act2_td).toFixed(3)}`;
    exp_complete();
}
function exp_complete() {
    alert('Experiment completed');
}
//# sourceMappingURL=activity2.js.map