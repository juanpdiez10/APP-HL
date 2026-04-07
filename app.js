// ===== BERTHS DATA =====
const berthsByPort = {
    'rosario': ['Terminal 6 (Cargill)','ACA - Rosario','Dreyfus - Rosario','Punta Alvear (Bunge)','COFCO (ex Noble)','Terminal Puerto Rosario (TPR)','Servicios Portuarios'],
    'san-lorenzo': ['Cargill - Quebracho','Bunge - San MartÃ­n','Renova (Viterra)','LDC - General Lagos','AGD','Molinos RÃ­o de la Plata','COFCO - San MartÃ­n','ACA - San Lorenzo','ADM','VicentÃ­n'],
    'necochea': ['Terminal QuequÃ©n S.A. - Sitio 0','Terminal QuequÃ©n S.A. - Sitio 1','Terminal QuequÃ©n S.A. - Sitio 2','ACA - QuequÃ©n'],
    'bahia-blanca': ['Terminal BahÃ­a Blanca (Cargill)','BACTSSA - Terminal Cereales','Sitio 9','Sitio 10']
};

// ===== NAVIGATION =====
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    requestAnimationFrame(() => {
        const t = document.getElementById(screenId);
        if (t) t.classList.add('active');
    });
    if (screenId === 'screen-splash') setTimeout(() => navigateTo('screen-dashboard'), 3000);
}

// ===== TABS =====
function switchTab(btn, tabId) {
    btn.closest('.tab-bar').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
}

// ===== CHIP SELECTION =====
function selectChip(el) {
    el.closest('.chip-group').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
}

// ===== STEPPER =====
function stepValue(btn, delta) {
    const v = btn.closest('.stepper').querySelector('.stepper-value');
    let val = parseInt(v.textContent) + delta;
    v.textContent = Math.max(1, Math.min(9, val));
}

// ===== COMPANY SELECT =====
function selectCompany(el) {
    document.querySelectorAll('.company-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
}

// ===== UPDATE BERTHS DROPDOWN =====
function updateBerths() {
    const val = (document.getElementById('portSelect').value || '').toLowerCase();
    let port = '';
    if(val.includes('rosario')) port = 'rosario';
    else if(val.includes('san lorenzo') || val.includes('san mart')) port = 'san-lorenzo';
    else if(val.includes('necochea') || val.includes('quequ')) port = 'necochea';
    else if(val.includes('bah')) port = 'bahia-blanca';
    
    const sel = document.getElementById('berth-list');
    if(!sel) return;
    sel.innerHTML = '';
    const berths = berthsByPort[port] || [];
    berths.forEach(b => { 
        const o = document.createElement('option'); 
        o.value = b; 
        sel.appendChild(o); 
    });
}

// ===== SEAL TOGGLE =====
function toggleSeal(btn) {
    btn.classList.toggle('active');
    const text = btn.nextElementSibling;
    text.textContent = btn.classList.contains('active') ? 'SÃ - Obligatorio' : 'NO';
    text.style.color = btn.classList.contains('active') ? 'var(--success)' : 'var(--text-muted)';
}

// ===== NOTIFICATIONS =====
function toggleNotifications() {
    const b = document.querySelector('.notification-badge');
    if (b) b.style.display = b.style.display === 'none' ? 'flex' : 'none';
}

// ===== SENT CONFIRMATION =====
function showSentConfirmation() { document.getElementById('sentOverlay').classList.add('show'); }
function hideSentConfirmation() { document.getElementById('sentOverlay').classList.remove('show'); }

// ===== ADD COMMODITY BLOCK =====
let commodityCount = 1;
function addCommodityBlock() {
    commodityCount++;
    const container = document.querySelector('.commodity-block').parentElement;
    const btn = container.querySelector('.btn-add-shipper');
    const block = document.createElement('div');
    block.className = 'commodity-block';
    block.innerHTML = `
        <div class="commodity-header"><span class="commodity-badge">MercaderÃ­a ${commodityCount}</span>
        <button style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:18px" onclick="this.closest('.commodity-block').remove()">âœ•</button></div>
        <div class="form-group"><label>Tipo</label>
        <select class="form-select"><option>Seleccionar...</option><option>SOYBEAN</option><option>CORN</option><option>WHEAT</option><option>SOYBEAN MEAL</option><option>SOYBEAN PELLETS</option><option>SOYBEAN OIL</option><option>SUNFLOWER OIL</option><option>SUNFLOWER SEEDS</option><option>URUGUAYAN SOYBEANS</option></select></div>
        <div class="form-row"><div class="form-group flex-1"><label>Cantidad (MT)</label><input type="number" class="form-input" placeholder="0"></div>
        <div class="form-group flex-1"><label>Bodegas Asignadas</label><input type="text" class="form-input" placeholder="Ej: 6,7"></div></div>`;
    container.insertBefore(block, btn);
}

// ===== TOGGLE BUTTONS (Quality) =====
document.querySelectorAll('.param-toggle').forEach(toggle => {
    toggle.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

// ===== COLOR SWATCHES =====
document.querySelectorAll('.color-swatch').forEach(s => {
    s.addEventListener('click', () => {
        s.closest('.color-picker-row').querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
    });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => { updateBerths(); });

// ===== NAVIGATION BACK BUTTON =====
window.addEventListener('popstate', (e) => {
    if(e.state && e.state.screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const t = document.getElementById(e.state.screen);
        if (t) t.classList.add('active');
    }
});

const originalNavigateTo = navigateTo;
navigateTo = function(screenId) {
    history.pushState({screen: screenId}, '', '#' + screenId);
    originalNavigateTo(screenId);
};

// ===== HOLD CHIPS =====
window.toggleHoldChip = function(btn) {
    btn.classList.toggle('active');
};

// ===== QUANTITY SUM =====
window.calcTotalQty = function() {
    let sum = 0;
    document.querySelectorAll('.qty-input').forEach(inp => {
        let val = inp.value.replace(/,/g, ''); sum += parseFloat(val) || 0;
    });
    const el = document.getElementById('qtyTotalTurno');
    if(el) el.textContent = sum.toLocaleString('en-US') + ' MT';
    
    // Accum and Remaining (Mock base numbers + dynamic sum)
    const baseAcum = 19600; // Total accumulated before this shift
    const newAcum = baseAcum + sum;
    const rem = 35000 - newAcum;
    
    const eq = document.getElementById('qtyTotalAcum');
    const er = document.getElementById('qtyRestante');
    if(eq) eq.textContent = newAcum.toLocaleString('en-US') + ' MT';
    if(er) er.textContent = Math.max(0, rem).toLocaleString('en-US') + ' MT';
};

// ===== SOF CONDITIONAL FIELDS =====
window.updateSofFields = function() {
    const val = document.getElementById('sofEventSelect').value;
    const container = document.getElementById('sofConditionalFields');
    let html = '';
    
    if (val === 'FALLA') {
        html = '<div class="form-group"><label>Falla en:</label><input type="text" class="form-input" placeholder="Ej: Cinta 2, grÃºa 3..."></div>';
    } else if (val === 'REANUDA_BODEGA') {
        html = '<div class="form-group"><label>Bodega</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option></select></div>';
    } else if (val === 'CAMBIO_MERCADERIA') {
        html = '<div class="form-group"><label>Nueva MercaderÃ­a</label><input type="text" class="form-input" placeholder="Ej: SOYBEAN MEAL"></div><div class="form-group"><label>Bodega</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>';
    } else if (val === 'CAMBIO_BODEGA') {
        html = '<div class="form-row"><div class="form-group flex-1"><label>Bodega Anterior</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="form-group flex-1"><label>Bodega Actual</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div></div>';
    }
    
    container.innerHTML = html;
};

// Let's set the initial route state
history.replaceState({screen: 'screen-welcome'}, '', '#screen-welcome');

// Initialize selected options
document.addEventListener('DOMContentLoaded', () => { if(window.updateSofFields) window.updateSofFields(); });


window.updateSofFields = function() { const val = document.getElementById('sofEventSelect').value; const container = document.getElementById('sofConditionalFields'); let html = ''; if (val === 'FALLA') { html = '<div class="form-group"><label>Falla en:</label><input type="text" class="form-input" placeholder="Ej: Cinta 2, grúa 3..."></div>'; } else if (val === 'REANUDA_BODEGA') { html = '<div class="form-group"><label>Bodega</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option></select></div>'; } else if (val === 'CAMBIO_MERCADERIA') { html = '<div class="form-group"><label>Bodega</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>'; } else if (val === 'CAMBIO_BODEGA') { html = '<div class="form-row"><div class="form-group flex-1"><label>Bodega Anterior</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div><div class="form-group flex-1"><label>Bodega Actual</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div></div>'; } container.innerHTML = html; };



window.formatQuantity = function(el) { let val = el.value.replace(/[^0-9.]/g, ''); if(!val) return; let num = parseFloat(val); if(!isNaN(num)) el.value = num.toLocaleString('en-US', {minimumFractionDigits: 3, maximumFractionDigits: 3}); };

window.addCommodityToShipper = function(btn) {
    const container = btn.parentElement;
    const count = container.querySelectorAll('.commodity-block').length + 1;
    const block = document.createElement('div');
    block.className = 'commodity-block';
    block.style = 'border:1px solid var(--border);background:var(--bg-card);border-radius:8px;padding:14px;margin-bottom:10px; position:relative;';
    block.innerHTML = '<div style="font-size:11px;font-weight:800;color:var(--gold);margin-bottom:10px;background:var(--bg-dark);display:inline-block;padding:2px 8px;border-radius:4px;" class="commodity-number">MERCADERÍA '+count+'</div><button class="icon-btn" onclick="this.parentElement.remove()" style="position:absolute;top:2px;right:2px;color:var(--danger);padding:4px"><span class="material-icons-round" style="font-size:16px">close</span></button><div class="form-group"><label>Mercadería</label><select class="form-select commodity-select"><option>Seleccionar...</option><option>SOYBEAN</option><option>CORN</option><option>WHEAT</option><option>SOYBEAN MEAL</option><option>SOYBEAN PELLETS</option><option>SOYBEAN OIL</option></select></div><div class="form-group"><label>Cantidad (MT)</label><input type="text" class="form-input qty-formatter" inputmode="decimal" placeholder="0.000" onblur="formatQuantity(this)" onkeypress="if(event.key===\'Enter\') this.blur();"></div><div class="form-group" style="margin-bottom:0"><label>Bodegas Asignadas</label><div class="chip-group hold-chips multi" style="display:flex; flex-wrap:wrap; gap:10px; width:100%; margin-top:4px;"><button class="chip" onclick="toggleHoldChip(this)">1</button><button class="chip" onclick="toggleHoldChip(this)">2</button><button class="chip" onclick="toggleHoldChip(this)">3</button><button class="chip" onclick="toggleHoldChip(this)">4</button><button class="chip" onclick="toggleHoldChip(this)">5</button><button class="chip" onclick="toggleHoldChip(this)">6</button><button class="chip" onclick="toggleHoldChip(this)">7</button></div></div>';
    container.insertBefore(block, btn);
};

window.addShipperBlock = function(btn) {
    const section = btn.parentElement;
    const shipperCount = section.querySelectorAll('.shipper-card').length + 1;
    const block = document.createElement('div');
    block.className = 'shipper-card';
    block.id = 'shipper-' + shipperCount;
    block.innerHTML = '<div class="shipper-header"><span class="shipper-badge">Cargador ' + shipperCount + '</span><button class="icon-btn" onclick="this.parentElement.parentElement.remove()" style="color:var(--danger);padding:0"><span class="material-icons-round" style="font-size:18px">delete</span></button></div>' + 
    '<div class="form-row"><div class="form-group flex-1"><label>Empresa</label><select class="form-select"><option>CARGILL SACI</option><option>LDC ARG S.A.</option><option>MOLINOS AGRO</option><option>YPF ARG S.A.</option><option>ACA COOP LTDA.</option><option>ADM AGRO</option><option>UAA</option><option>AGD</option><option>LDC UY</option><option>VITERRA</option><option>BUNGE</option></select></div><div class="form-group flex-1"><label style="white-space:nowrap">Comprador</label><select class="form-select"><option value="">Seleccionar comprador...</option><option>Invictus</option><option>J. Macedo</option></select></div></div>' + 
    '<div class="form-group"><label>Emails para reportes</label><div class="email-tags"><input type="email" placeholder="+ agregar email" class="email-input"></div></div>' + 
    '<div style="background:var(--bg-dark);border:1px solid var(--border);border-radius:10px;padding:14px;margin-top:14px;">' + 
    '<h5 style="font-size:12px;color:var(--gold);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">Lotes / Mercaderías Asignadas</h5>' + 
    '<div class="commodity-block" style="border:1px solid var(--border);background:var(--bg-card);border-radius:8px;padding:14px;margin-bottom:10px; position:relative;">' + 
    '<div style="font-size:11px;font-weight:800;color:var(--gold);margin-bottom:10px;background:var(--bg-dark);display:inline-block;padding:2px 8px;border-radius:4px;">MERCADERÍA 1</div>' + 
    '<div class="form-group"><label>Mercadería</label><select class="form-select commodity-select"><option>Seleccionar...</option><option>SOYBEAN</option><option>CORN</option><option>WHEAT</option></select></div>' + 
    '<div class="form-group"><label>Cantidad (MT)</label><input type="text" class="form-input qty-formatter" inputmode="decimal" placeholder="0.000" onblur="formatQuantity(this)" onkeypress="if(event.key===\'Enter\') this.blur();"></div>' + 
    '<div class="form-group" style="margin-bottom:0"><label>Bodegas Asignadas</label><div class="chip-group hold-chips multi" style="display:flex; flex-wrap:wrap; gap:10px; width:100%; margin-top:4px;"><button class="chip" onclick="toggleHoldChip(this)">1</button><button class="chip" onclick="toggleHoldChip(this)">2</button><button class="chip" onclick="toggleHoldChip(this)">3</button><button class="chip" onclick="toggleHoldChip(this)">4</button><button class="chip" onclick="toggleHoldChip(this)">5</button><button class="chip" onclick="toggleHoldChip(this)">6</button><button class="chip" onclick="toggleHoldChip(this)">7</button></div></div>' + 
    '</div><button class="btn-add-shipper btn-sm" onclick="addCommodityToShipper(this)"><span class="material-icons-round">add</span><span>Agregar Lote a este Cargador</span></button></div>';
    section.insertBefore(block, btn);
};

window.toggleTheme = function() { const isLight = document.body.classList.toggle('light-mode'); document.querySelectorAll('#theme-btn').forEach(btn => btn.textContent = isLight ? 'dark_mode' : 'light_mode'); };


