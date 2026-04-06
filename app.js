// ===== BERTHS DATA =====
const berthsByPort = {
    'rosario': ['Terminal 6 (Cargill)','ACA - Rosario','Dreyfus - Rosario','Punta Alvear (Bunge)','COFCO (ex Noble)','Terminal Puerto Rosario (TPR)','Servicios Portuarios'],
    'san-lorenzo': ['Cargill - Quebracho','Bunge - San Martín','Renova (Viterra)','LDC - General Lagos','AGD','Molinos Río de la Plata','COFCO - San Martín','ACA - San Lorenzo','ADM','Vicentín'],
    'necochea': ['Terminal Quequén S.A. - Sitio 0','Terminal Quequén S.A. - Sitio 1','Terminal Quequén S.A. - Sitio 2','ACA - Quequén'],
    'bahia-blanca': ['Terminal Bahía Blanca (Cargill)','BACTSSA - Terminal Cereales','Sitio 9','Sitio 10']
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
    const port = document.getElementById('portSelect').value;
    const sel = document.getElementById('berthSelect');
    sel.innerHTML = '';
    const berths = berthsByPort[port] || [];
    berths.forEach(b => { const o = document.createElement('option'); o.textContent = b; sel.appendChild(o); });
    const custom = document.createElement('option');
    custom.textContent = '+ Agregar muelle manualmente...';
    custom.value = '__custom__';
    sel.appendChild(custom);
}

// ===== SEAL TOGGLE =====
function toggleSeal(btn) {
    btn.classList.toggle('active');
    const text = btn.nextElementSibling;
    text.textContent = btn.classList.contains('active') ? 'SÍ - Obligatorio' : 'NO';
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
        <div class="commodity-header"><span class="commodity-badge">Mercadería ${commodityCount}</span>
        <button style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:18px" onclick="this.closest('.commodity-block').remove()">✕</button></div>
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
