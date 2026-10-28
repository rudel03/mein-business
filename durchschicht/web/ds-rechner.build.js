/* DURCHSCHICHT – Schichtplan-Rechner: Dienstplan rein, Essensplan raus. */
(function () {
  var R = {"V01":["Linsen-Gemüse-Eintopf","MT","SNKT",2,1,15],"V02":["Ofen-Hähnchen mit Kartoffeln & Paprika","MK","SNKT",2,0,10],"V03":["Chili mit Bohnen & Rinderhack","MT","SNKT",1,1,15],"V04":["Nudeln mit Tomaten-Thunfisch-Soße","MK","FSN",2,0,15],"V05":["Gemüse-Curry mit Kichererbsen","MT","SNKT",2,1,15],"V06":["Kartoffel-Hack-Pfanne mit Spinat","M","SN",2,0,20],"V07":["Reis-Hähnchen-Gemüsepfanne","M","FSN",1,0,20],"V08":["Ofen-Lachs mit Ofengemüse","MK","FS",1,0,10],"M01":["Burrito-Bowl mit Bohnen & Reis","M","FSN",1,1,15],"M02":["Penne-Gemüse-Auflauf","M","SNKT",2,1,15],"M03":["Hähnchen-Tikka mit Reis","M","SNKT",1,1,15],"M04":["Gnocchi mit Tomate & Mozzarella","M","FSN",2,0,15],"M05":["Rindergulasch mit Nudeln","MT","KT",2,1,20],"M06":["Linsen-Bolognese mit Vollkornspaghetti","M","FSNKT",2,1,15],"M07":["Shakshuka mit Kichererbsen","M","FSA",1,0,15],"M08":["Couscous-Gemüsepfanne mit Halloumi","MK","FSN",2,0,15],"K01":["Couscous-Kichererbsen-Salat im Glas","KO","FSN",2,0,15],"K02":["Nudelsalat mit Pesto & Hähnchen","KO","FSN",2,0,15],"K03":["Wraps mit Hummus, Falafel & Gemüse","KO","FSN",1,0,15],"K04":["Linsensalat mit Feta","KO","FSN",2,0,10],"K05":["Kartoffelsalat mit Ei & Gurke","K","SN",1,0,15],"K06":["Quinoa-Bowl mit Ofengemüse & Tahin","KO","FSN",2,0,15],"K07":["Reisnudel-Salat mit Erdnuss & Hähnchen","K","SN",2,0,15],"K08":["Frikadellen mit Gurken-Dip","KO","FSN",2,1,25],"T01":["Kürbis-Linsen-Suppe","TM","SNKT",2,1,15],"T02":["Hühner-Reissuppe mit Gemüse","TM","NKT",1,0,15],"T03":["Chili sin Carne","TM","SNKT",2,1,15],"T04":["Kartoffel-Lauch-Suppe mit Würstchen","TM","NKT",2,0,15],"T05":["Milchreis mit Apfel & Zimt","TK","NA",2,0,10],"T06":["Gemüse-Nudel-Eintopf (Minestrone)","TM","SNKT",2,0,15],"N01":["Snackbox: Hummus, Gemüse & Cracker","KO","N",1,0,10],"N02":["Overnight Oats Apfel-Zimt","KO","NF",1,0,5],"N03":["Gekochte Eier mit Gurke & Salz","KO","NF",2,0,5],"N04":["Quark mit Beeren & Haferflocken","K","NA",1,0,5],"N05":["Dattel-Kakao-Kugeln","O","N",2,1,15],"N06":["Ofen-Kichererbsen mit Paprika","O","NS",2,0,5],"N07":["Vollkornbrot mit Frischkäse & Radieschen","K","NF",2,0,5],"N08":["Gefrorene Joghurt-Beeren-Taler","K","N",2,1,10],"A01":["Haferbrei mit Banane","","A",2,0,8],"A02":["Rührei auf Vollkorntoast","","A",2,0,8],"A03":["Joghurt mit Obst & Nüssen","","A",2,0,3],"A04":["Spätschicht-Teller: Brot, Käse, Rohkost","","A",2,0,5],"A05":["Tomatensuppe aus dem Vorrat","","A",2,0,10],"A06":["Aufgetaute Truhen-Portion","","A",1,0,2],"B01":["Blech-Ofengemüse für die Woche","MK","KT",2,0,15],"B02":["Gezupftes Ofenhähnchen","MK","KT",2,1,10],"B03":["Getreide-Vorrat: Couscous, Quinoa, Bulgur","KO","KT",2,0,5],"B04":["Drei Soßen für die Box","KO","KT",2,0,15]};
  var T = { F: 'Früh', S: 'Spät', N: 'Nacht', X: 'Frei' };
  var ORDER = ['F', 'S', 'N', 'X'];
  var DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  function ids(filter) { return Object.keys(R).filter(function (k) { return filter(k, R[k]); }); }
  function fits(eq, has) {
    if (!eq) return true;
    for (var i = 0; i < eq.length; i++) if (eq[i] === 'O' || has[eq[i]]) return true;
    return false;
  }
  function pick(list, n, avoid) {
    var free = list.filter(function (k) { return avoid.indexOf(k) === -1; });
    var src = free.length ? free : list;
    return src[n % src.length];
  }
  function label(k) { return k + ' ' + R[k][0]; }

  /* R[k] = [Titel, Ausstattung, Slots, Kühlschrank-Tage, einfrierbar, aktive Min.] */
  function source(k, age) {
    var r = R[k];
    if (age <= r[3]) return 'aus dem Kühlschrank (Kochblock)';
    if (r[4]) return 'aus der Truhe – am Vorabend in den Kühlschrank zum Auftauen';
    return 'am Vorabend frisch machen (ca. ' + r[5] + ' Min.)';
  }
  function boxNote(k, has) {
    var eq = R[k][1];
    if (k[0] === 'T' && !has.M) return ' · morgens kochend heiß in den vorgewärmten Thermobehälter';
    if (eq.indexOf('K') > -1 && eq.indexOf('O') === -1 && !has.K) return ' · mit zwei Kühlakkus in der Kühltasche';
    return '';
  }

  function plan(shifts, has) {
    var out = [], recent = [], lastCook = -1, cooked = [];
    var homeMain = ids(function (k) { return k[0] === 'V'; });
    var after = { S: ['A04', 'A05', 'A03'], N: ['A01', 'A02', 'A03'] };
    function boxesFor(slot, age) {
      var all = ids(function (k, r) { return 'MKT'.indexOf(k[0]) > -1 && r[2].indexOf(slot) > -1 && fits(r[1], has); });
      if (!all.length) all = ids(function (k, r) { return k[0] === 'K' && r[2].indexOf(slot) > -1; });
      var fromBlock = cooked.filter(function (k) { return all.indexOf(k) > -1 && age <= R[k][3]; });
      return fromBlock.length ? fromBlock : all;
    }
    function cookBlock(i) {
      var work = shifts.slice(i + 1, i + 4).filter(function (s) { return s !== 'X'; });
      var slot = work[0] || 'S';
      var mains = homeMain.filter(function (k) { return R[k][4] && R[k][2].indexOf(slot) > -1; });
      var main = pick(mains.length ? mains : homeMain.filter(function (k) { return R[k][4]; }), i + 1, recent);
      var all = ids(function (k, r) { return 'MKT'.indexOf(k[0]) > -1 && r[2].indexOf(slot) > -1 && fits(r[1], has); });
      var keep = all.filter(function (k) { return R[k][3] >= 2; });
      var box = pick(keep.length ? keep : all, i + 2, recent);
      cooked = [box, main];
      return [main, box];
    }
    var first = cookBlock(-1);
    out.push({ t: 'X', pre: true, rows: [['Kochblock', first.map(label).join(' · ') + ' – 2 Portionen in den Kühlschrank, der Rest in die Truhe']], tip: 'Ein Kochblock von etwa 60 Minuten reicht für die ersten Schichttage.' });

    for (var i = 0; i < shifts.length; i++) {
      var t = shifts[i], prev = shifts[i - 1], next = shifts[i + 1], d = { t: t, rows: [], tip: '' };
      if (t === 'X') {
        var upcoming = shifts.slice(i + 1, i + 4).some(function (s) { return s !== 'X'; });
        if (upcoming && next === 'X') {
          d.rows.push(['Heute', 'Frei – Mahlzeiten zu festen Zeiten. Morgen ist Kochtag.']);
        } else if (upcoming) {
          var c = cookBlock(i); lastCook = i; recent = c.slice();
          d.rows.push(['Kochblock', c.map(label).join(' · ') + ' – 2 Portionen in den Kühlschrank, der Rest in die Truhe']);
        } else {
          d.rows.push(['Heute', 'Frei – Mahlzeiten zu festen Zeiten, nichts vorkochen nötig']);
        }
        if (prev === 'N') d.tip = 'Nach der letzten Nacht: Tagschlaf eher kurz halten, abends normal essen und früh ins Bett.';
        else if (next === 'N') d.tip = 'Morgen erste Nacht: nachmittags schlafen, wenn es geht. Um 19 Uhr warm essen.';
        out.push(d); continue;
      }
      var age = i - lastCook;
      var box = pick(boxesFor(t, age), i, recent);
      var pause = label(box) + ' – ' + source(box, age) + boxNote(box, has);
      var home = function (n) { return label(pick(homeMain, n, recent.concat([box]))); };
      if (t === 'F') {
        d.rows.push(['Vor der Schicht', label('N02') + ' (am Vorabend angesetzt) oder ' + label('N07')]);
        d.rows.push(['Pause', pause]);
        d.rows.push(['Nach der Schicht', home(i + 1)]);
      } else if (t === 'S') {
        d.rows.push(['Mittags zu Hause', home(i + 2)]);
        d.rows.push(['Pause', pause]);
        d.rows.push(['Feierabend ~22:30', label(after.S[i % 3]) + ' – kein Kochen mehr']);
      } else {
        var snacks = ids(function (k, r) { return k[0] === 'N' && r[2].indexOf('N') > -1 && fits(r[1], has); });
        d.rows.push(['19 Uhr, vor der Nacht', home(i + 3)]);
        d.rows.push(['Pause ~0 Uhr', pause]);
        d.rows.push(['3–4 Uhr, nur bei Hunger', label(pick(snacks, i, []))]);
        d.rows.push(['Nach der Schicht', label(after.N[i % 3]) + ' – klein, dann schlafen']);
        if (prev !== 'N') d.tip = 'Erste Nacht: Die Hauptmahlzeit gehört vor die Schicht, nicht in die zweite Nachthälfte.';
      }
      if (t !== 'N' && next === 'N' && !d.tip) d.tip = 'Morgen erste Nacht: Box für die Nacht heute Abend schon packen.';
      recent = [box].concat(recent).slice(0, 3);
      out.push(d);
    }
    return out;
  }

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function init(root) {
    var len = parseInt(root.getAttribute('data-days') || '7', 10);
    var shifts = ['F', 'F', 'S', 'S', 'N', 'N', 'X', 'X', 'X', 'F', 'F', 'S', 'S', 'N'].slice(0, len);
    var has = { M: true, K: true, T: false };
    var grid = root.querySelector('[data-grid]'), res = root.querySelector('[data-result]');

    function drawGrid() {
      grid.innerHTML = '';
      shifts.forEach(function (s, i) {
        var b = el('button', 'dsr-day dsr-' + s);
        b.type = 'button';
        b.setAttribute('aria-label', 'Tag ' + (i + 1) + ': ' + T[s] + ' – tippen zum Wechseln');
        b.appendChild(el('span', 'dsr-dn', DAYS[i % 7]));
        b.appendChild(el('span', 'dsr-sh', T[s]));
        b.addEventListener('click', function () { shifts[i] = ORDER[(ORDER.indexOf(s) + 1) % 4]; drawGrid(); draw(); });
        grid.appendChild(b);
      });
    }
    function draw() {
      res.innerHTML = '';
      plan(shifts, has).forEach(function (d, i) {
        var c = el('article', 'dsr-card dsr-' + d.t);
        var h = el('header', 'dsr-ch');
        h.appendChild(el('b', null, d.pre ? 'Vor Tag 1' : DAYS[(i - 1) % 7] + ' · Tag ' + i));
        h.appendChild(el('span', 'dsr-tag', d.pre ? 'Kochtag' : T[d.t]));
        c.appendChild(h);
        var dl = el('dl');
        d.rows.forEach(function (r) { dl.appendChild(el('dt', null, r[0])); dl.appendChild(el('dd', null, r[1])); });
        c.appendChild(dl);
        if (d.tip) c.appendChild(el('p', 'dsr-tip', d.tip));
        res.appendChild(c);
      });
    }
    root.querySelectorAll('[data-eq]').forEach(function (cb) {
      cb.checked = !!has[cb.getAttribute('data-eq')];
      cb.addEventListener('change', function () { has[cb.getAttribute('data-eq')] = cb.checked; draw(); });
    });
    root.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        shifts = b.getAttribute('data-preset').split('').slice(0, len);
        while (shifts.length - len) shifts.push('X');
        drawGrid(); draw();
      });
    });
    drawGrid(); draw();
  }

  document.querySelectorAll('[data-ds-rechner]').forEach(init);
})();
