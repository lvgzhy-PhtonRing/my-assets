const fs = require('fs');

function inferCategory(title, type, amount) {
    const t = (title||'').toLowerCase();
    if (!type) type = (amount >= 0 ? 'income' : 'expense');
    if (type === 'expense' || amount < 0) {
        if (/德州/.test(t)) return '德州出账';
        if (/贞贞|^ai\b|apimart|apiqik|gaski|manus|星流|google|leonardo|apple music|apple/.test(t)) return '数字服务';
        if (/差旅|停车|武汉|郑州/.test(t)) return '差旅交通';
        if (/手机膜|皮蛋|斯巴鲁|翼豹|交通罚款|聚会/.test(t)) return '生活购物';
        return '其他';
    }
    if (/德州/.test(t) && !/起始/.test(t)) return '德州入账';
    if (/起始值|初始/.test(t)) return '初始资金';
    if (/公款/.test(t)) return '公款转入';
    return '其他';
}

const data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

// Fix logs
const logs = JSON.parse(data.logs);
let changed = 0;
logs.forEach(l => {
    if (!l.category) {
        if (!l.type) l.type = l.amount >= 0 ? 'income' : 'expense';
        l.category = inferCategory(l.title, l.type, l.amount);
        changed++;
    }
});
data.logs = JSON.stringify(logs);

// Fix snapshots too
const snaps = JSON.parse(data.snapshots);
for (let date in snaps) {
    snaps[date].forEach(s => {
        (s.logs||[]).forEach(l => {
            if (!l.category) {
                if (!l.type) l.type = l.amount >= 0 ? 'income' : 'expense';
                l.category = inferCategory(l.title, l.type, l.amount);
            }
        });
    });
}
data.snapshots = JSON.stringify(snaps);

const outPath = process.argv[3];
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log('Done. Changed ' + changed + ' log records. Output -> ' + outPath);
