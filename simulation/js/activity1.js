let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <h5>Radiation Shield Wall</h5>
        <p>Learning Objective: Calculate percentage reduction in heat transfer rate and steady state temperature of the shield.</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Caculate steady state temperature of shield", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>
        <p style="font-size: 24px; font-weight: 600; text-align: center">Activity 1</p> <br>
        <h5> Find the heat transfer per unit area due to radiation between two infinite long parallel planes. The first plane has emissivity ${act1_eps1} and is maintained at ${act1_t1_val}<sup>o</sup>C. The emissivity of the second plane is ${act1_eps2} and maintained at ${act1_t2_val}<sup>o</sup>C. A radiation shield having emissivity of ${act1_eps3} is introduced between given two planes. Find the percentage reduction in the heat transfer rate and steady state temperature of the shield. </h5>
        <div class="row">
            <div class="col-6"> <p style='text-align: left;'><img style='width: 80%;' src='./images/activity1_1.png'></p> </div>
            <div class="col-6"> <p style='text-align: left;'><img style='width: 100%;' src='./images/activity1_2.png'></p> </div>
        </div>
        <br>

        <h5>Without shield</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ (\\frac{Q}{A})_w = \\frac{\\sigma (T_1^4 - T_2^4)}{\\frac{1}{\\epsilon_1}+\\frac{1}{\\epsilon_2} - 1} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal01-inp'> <span id='cal01-val-sp'></span> w/m<sup>2</sup>

            <button class='btn btn-info std-btn' onclick='verify_act1_qaw();' id='btn_act1_qaw' style="width:20%">Verify</button>
        </p>

        <div id="act1_qas" style="display: none">
            <h5>With shield</h5>
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ (\\frac{Q}{A})_s = \\frac{\\sigma (T_1^4 - T_2^4)}{(\\frac{1}{\\epsilon_1}+\\frac{1}{\\epsilon_2} - 1) + \\frac{2}{\\epsilon_3} - 1} $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal02-inp'> <span id='cal02-val-sp'></span> w/m<sup>2</sup>

                <button class='btn btn-info std-btn' onclick='verify_act1_qas();' id='btn_act1_qas' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act1_redc" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ Percentage Reduction = \\frac{(\\frac{Q}{A})_w - (\\frac{Q}{A})_s}{(\\frac{Q}{A})_w} * 100 $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal03-inp'> <span id='cal03-val-sp'></span> %

                <button class='btn btn-info std-btn' onclick='verify_act1_redc();' id='btn_act1_redc' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act1_t3" style="display: none">
            <h5>Temperature of Shield</h5>
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ (\\frac{Q}{A}_s) = \\frac{\\sigma (T_1^4 - T_3^4)}{\\frac{1}{\\epsilon_1}+\\frac{1}{\\epsilon_3} - 1} $$
                    $$ T_3 = [\\frac{- \\frac{Q}{A}_s \\frac{1}{\\epsilon_1}+\\frac{1}{\\epsilon_3} - 1}{\\sigma}{T_1^4}] $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal04-inp'> <span id='cal04-val-sp'></span> <sup>o</sup>K

                <button class='btn btn-info std-btn' onclick='verify_act1_t3();' id='btn_act1_t3' style="width:20%">Verify</button>
            </p>
        </div>
    </div>
    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => { show_step('tb1-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    internal_calculations();
}
function internal_calculations() {
    act1_ecal = (1 / act1_eps1) + (1 / act1_eps2) - 1;
    act1_ecal_1 = (1 / act1_eps1) + (1 / act1_eps3) - 1;
    act1_qaw = sigma * (Math.pow(act1_t1, 4) - Math.pow(act1_t2, 4)) / act1_ecal;
    act1_qas = sigma * (Math.pow(act1_t1, 4) - Math.pow(act1_t2, 4)) / (act1_ecal + (2 / act1_eps3) - 1);
    act1_redt_per = ((act1_qaw - act1_qas) / act1_qaw) * 100;
    act1_t3 = Math.pow((-(act1_qas * act1_ecal_1) / sigma + Math.pow(act1_t1, 4)), (1 / 4));
    console.log("act1 sigma= ", sigma);
    console.log("act1 ecal= ", act1_ecal);
    console.log("act1 qaw= ", act1_qaw);
    console.log("act1 qas= ", act1_qas);
    console.log("act1 radiation percentage= ", act1_redt_per);
    console.log("act1 t3= ", act1_t3);
}
function verify_act1_qaw() {
    let btn = document.getElementById('btn_act1_qaw');
    let div = document.getElementById('act1_qas');
    let inp1 = document.getElementById('cal01-inp');
    let sp1 = document.getElementById('cal01-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp1.value).toFixed(3)), parseFloat(act1_qaw.toFixed(3)))) {
        alert('Without shield value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp1.remove();
    sp1.innerText = `${(act1_qaw).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act1_qas() {
    let btn = document.getElementById('btn_act1_qas');
    let div = document.getElementById('act1_redc');
    let inp2 = document.getElementById('cal02-inp');
    let sp2 = document.getElementById('cal02-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp2.value).toFixed(2)), parseFloat(act1_qas.toFixed(2)))) {
        alert('With Shield value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp2.remove();
    sp2.innerText = `${(act1_qas).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act1_redc() {
    let btn = document.getElementById('btn_act1_redc');
    let div = document.getElementById('act1_t3');
    let inp3 = document.getElementById('cal03-inp');
    let sp3 = document.getElementById('cal03-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp3.value).toFixed(3)), parseFloat(act1_redt_per.toFixed(3)))) {
        alert('Percentage reduction value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp3.remove();
    sp3.innerText = `${(act1_redt_per).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act1_t3() {
    let btn = document.getElementById('btn_act1_t3');
    let inp4 = document.getElementById('cal04-inp');
    let sp4 = document.getElementById('cal04-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp4.value).toFixed(3)), parseFloat(act1_t3.toFixed(3)))) {
        alert('Shield Temperature value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp4.remove();
    sp4.innerText = `${(act1_t3).toFixed(3)}`;
    activity2();
}
activity1();
//# sourceMappingURL=activity1.js.map