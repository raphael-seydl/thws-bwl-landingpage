/* Quellen: THWS-Schwerpunktseiten, geprüft 14.09.2026.
Redaktionelle Gewichtung 0–5, keine offizielle THWS-Eignungsbewertung.
Reihenfolge: Marketing, Personal, Finanzen, Digital, International, Nachhaltigkeit, Entrepreneurship, Vertrieb.
Die Übersicht nennt 19 Vertiefungen, ihre Navigation enthält diese 17 Seiten.
Controlling verweist inzwischen auf zwei eigenständige Vertiefungen.
Bei schwacher Überschneidung wird die Grenze ausdrücklich benannt. */
const focusCatalog=[
  [
    "Bank-, Finanz- und Investitionswirtschaft",
    "bank-finanz-und-investitionswirtschaft",
    [
      0,
      0,
      5,
      3,
      3,
      4,
      3,
      1
    ],
    [
      "",
      "",
      "Finanzplanung und Unternehmensbewertung",
      "Finanztechnologie",
      "Währungs- und Zinsrisiken",
      "Nachhaltigkeit im Risikomanagement",
      "Finanzierung von Unternehmen",
      ""
    ]
  ],
  [
    "Change Management & Business Transformation",
    "change-management-business-transformation",
    [
      2,
      5,
      1,
      3,
      1,
      4,
      3,
      0
    ],
    [
      "Kommunikation von Veränderungen",
      "Organisationsentwicklung und Unternehmenskultur",
      "",
      "strategische Neuausrichtung von Unternehmen",
      "",
      "nachhaltige Transformation und Wertemanagement",
      "Veränderungs- und Projektmanagement",
      ""
    ]
  ],
  [
    "Controlling",
    "controlling",
    [
      3,
      3,
      5,
      3,
      2,
      1,
      2,
      3
    ],
    [
      "Steuerung des Vertriebs",
      "Steuerung im Personalwesen",
      "Unternehmenssteuerung und Entscheidungsunterstützung",
      "praktische Arbeit mit Controlling-Tools",
      "",
      "",
      "",
      "Steuerung des Vertriebs"
    ]
  ],
  [
    "Entrepreneurship and Small and Medium sized Enterprises",
    "entrepreneurship-and-small-and-medium-sized-enterprises",
    [
      3,
      2,
      4,
      3,
      4,
      4,
      5,
      3
    ],
    [
      "Entwicklung von Geschäftsmodellen",
      "Führung kleiner und mittlerer Unternehmen",
      "Bewertung und Finanzierung von Start-ups",
      "Innovation und Geschäftsmodellentwicklung",
      "Internationalisierung von KMU",
      "Nachhaltigkeit und Strategie",
      "Lean Start-up und Business Planning",
      "Wachstumsstrategien"
    ]
  ],
  [
    "Finance & Accounting",
    "finance-accounting",
    [
      1,
      1,
      5,
      1,
      5,
      5,
      2,
      1
    ],
    [
      "",
      "",
      "Finanzanalyse und Controlling",
      "",
      "internationale Finanzberichterstattung und Steuern",
      "Financial & Sustainability Reporting",
      "",
      ""
    ]
  ],
  [
    "Human Resource Management",
    "human-resource-management",
    [
      1,
      5,
      1,
      1,
      5,
      1,
      2,
      1
    ],
    [
      "",
      "Leadership und strategisches Personalmanagement",
      "",
      "",
      "internationaler Personaleinsatz",
      "",
      "",
      ""
    ]
  ],
  [
    "Logistics",
    "logistics",
    [
      0,
      1,
      2,
      2,
      5,
      2,
      1,
      4
    ],
    [
      "",
      "",
      "",
      "",
      "englischsprachige Logistikprojekte",
      "",
      "",
      "logistische Aufgaben entlang der Lieferkette"
    ]
  ],
  [
    "Logistik",
    "logistik",
    [
      0,
      1,
      2,
      2,
      2,
      2,
      1,
      4
    ],
    [
      "",
      "",
      "Kosten und Prozesse in der Logistik",
      "logistische Prozesse",
      "",
      "aktuelle Herausforderungen der Logistik",
      "",
      "Warenflüsse und logistische Praxisprojekte"
    ]
  ],
  [
    "Management von Medienunternehmen",
    "management-von-medienunternehmen",
    [
      5,
      3,
      3,
      4,
      3,
      0,
      4,
      3
    ],
    [
      "Marketing und Produktpositionierung in Medienunternehmen",
      "Personalführung",
      "interne und externe Unternehmensrechnung",
      "Planung digitaler Medien",
      "Internationalisierung von Medienunternehmen",
      "",
      "Gründung und Geschäftsmodelle in der Medienbranche",
      "Marketing und Sales"
    ]
  ],
  [
    "Managerial Economics",
    "managerial-economics",
    [
      2,
      1,
      3,
      2,
      2,
      0,
      2,
      2
    ],
    [
      "Markt- und Wettbewerbsanalyse",
      "",
      "Entscheidungen unter Unsicherheit",
      "datengestützte Entscheidungen",
      "",
      "",
      "strategisches Verhalten",
      "Wettbewerbsstrategien"
    ]
  ],
  [
    "Marketing",
    "marketing",
    [
      5,
      0,
      4,
      5,
      2,
      0,
      2,
      5
    ],
    [
      "Kommunikationsstrategien und Mediaplanung",
      "",
      "Marketing-Controlling",
      "Online-Werbung und Social Media",
      "",
      "",
      "",
      "Handelsmarketing und Vertriebskonzepte"
    ]
  ],
  [
    "Marketing & Sales Management",
    "marketing-sales-management",
    [
      5,
      0,
      2,
      2,
      5,
      0,
      2,
      5
    ],
    [
      "Marketing in internationalen Projekten",
      "",
      "",
      "",
      "internationale Teams und englischsprachige Lehre",
      "",
      "",
      "Marketing und Vertriebsmanagement"
    ]
  ],
  [
    "Personalmanagement",
    "personalmanagement",
    [
      1,
      5,
      1,
      1,
      1,
      1,
      2,
      1
    ],
    [
      "",
      "strategisches Personalmanagement und Praxisprojekte",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  ],
  [
    "PR/Unternehmenskommunikation",
    "prunternehmenskommunikation",
    [
      5,
      2,
      0,
      4,
      1,
      1,
      1,
      1
    ],
    [
      "PR, Content-Marketing und Kommunikationsstrategien",
      "Kommunikation mit verschiedenen Zielgruppen",
      "",
      "digitale Kommunikation und Erfolgsmessung",
      "",
      "",
      "",
      ""
    ]
  ],
  [
    "Rechnungswesen",
    "rechnungswesen",
    [
      0,
      0,
      5,
      0,
      3,
      0,
      2,
      0
    ],
    [
      "",
      "",
      "Einzel- und Konzernabschlüsse",
      "",
      "internationale Rechnungslegungsstandards",
      "",
      "Rechnungslegung für Unternehmen",
      ""
    ]
  ],
  [
    "Unternehmensbesteuerung",
    "unternehmensbesteuerung",
    [
      0,
      0,
      5,
      0,
      4,
      0,
      4,
      0
    ],
    [
      "",
      "",
      "Besteuerung von Unternehmen",
      "",
      "internationales Steuerrecht",
      "",
      "Steuerbelastung verschiedener Gesellschaftsformen",
      ""
    ]
  ],
  [
    "Wirtschaftsinformatik und Digital Business",
    "wirtschaftsinformatik-und-digital-business",
    [
      1,
      2,
      4,
      5,
      1,
      1,
      3,
      3
    ],
    [
      "",
      "",
      "Business Intelligence und Unternehmensdaten",
      "Python, ERP-Systeme, KI und Automatisierung",
      "",
      "",
      "digitale Lösungen für Unternehmen",
      "digitale Abbildung von Unternehmensprozessen"
    ]
  ]
];
// Additional interests reflect the published subject areas. Indexes refer to
// the catalog above; weights and links are editorial, not official admissions rules.
const additionalInterests=[
 ['Steuern & Unternehmensgestaltung',[[15,5,'Steuerbelastung, Rechtsformen und internationales Steuerrecht'],[4,4,'internationale Besteuerung'],[14,3,'Zusammenspiel von Rechnungslegung und Steuern']]],
 ['Rechnungswesen & Reporting',[[14,5,'Einzel- und Konzernabschlüsse'],[4,5,'Finanz- und Nachhaltigkeitsberichterstattung'],[2,3,'Unternehmenssteuerung']]],
 ['Logistik & Lieferketten',[[7,5,'Warenflüsse und logistische Praxisprojekte'],[6,5,'englischsprachige Logistikprojekte'],[16,3,'ERP-Systeme und digitale Unternehmensprozesse']]],
 ['Medien & Content',[[8,5,'Geschäftsmodelle und Management von Medienunternehmen'],[13,5,'PR, Content-Marketing und digitale Kommunikation'],[10,4,'Mediaplanung und Social-Media-Kommunikation']]],
 ['Datenanalyse & Entscheidungen',[[9,5,'Ökonometrie und datengestützte Entscheidungen'],[16,5,'Business Intelligence und Programmierung'],[2,4,'Entscheidungsunterstützung im Controlling'],[0,3,'Finanz- und Kennzahlenanalyse']]],
 ['Investitionen & Finanzierung',[[0,5,'Unternehmensbewertung, Finanzierung und Portfoliomanagement'],[4,4,'Investment Banking und Risikomanagement'],[3,4,'Bewertung und Finanzierung von Start-ups']]]
];
additionalInterests.forEach(([label,matches])=>{
 const index=areas.length;areas.push(label);
 focusCatalog.forEach(entry=>{entry[2][index]=0;entry[3][index]=''});
 matches.forEach(([id,weight,reason])=>{focusCatalog[id][2][index]=weight;focusCatalog[id][3][index]=reason});
});
const focusIntro=document.querySelector('.focus-box > div > p:not(.eyebrow)');
if(focusIntro)focusIntro.textContent='Wähle bis zu zwei Themen, die dich wirklich interessieren. Dein Studium bietet dir Raum, aus 19 Vertiefungen zu wählen.';
function recommend(){
 if(f.length!==2)return null;
 const selected=f.map(area=>areas.indexOf(area)).sort((a,b)=>a-b);
 const pairs=[];
 const related={'14,15':'Rechnungslegung und steuerliche Gestaltung greifen hier ineinander.','9,16':'Du verbindest ökonomische Analysemethoden mit digitalen Werkzeugen.','0,3':'Gründungsideen werden durch Wissen über Finanzierung und Investitionen ergänzt.','1,12':'Personalentwicklung und die Gestaltung von Veränderungen ergänzen sich.','10,13':'Marktbearbeitung und strategische Unternehmenskommunikation ergänzen sich.','7,16':'Logistische Prozesse treffen auf digitale Unternehmenssysteme.','8,13':'Medienmanagement wird durch praktische Kommunikationskompetenzen ergänzt.','2,16':'Unternehmenssteuerung trifft auf Business Intelligence.'};
 for(let a=0;a<focusCatalog.length;a++)for(let b=a+1;b<focusCatalog.length;b++){
  // Logistics/Logistik are language variants; never imply they can be combined.
  if(a===6&&b===7)continue;
  const x=focusCatalog[a],y=focusCatalog[b],[i,j]=selected;
  const forward=x[2][i]+y[2][j],reverse=y[2][i]+x[2][j];
  const entries=forward>=reverse?[x,y]:[y,x];
  const coverage=[entries[0][2][i],entries[1][2][j]];
  if(Math.min(...coverage)<3)continue;
  const key=a+','+b;
  const score=10*Math.min(...coverage)+Math.max(forward,reverse)+(related[key]?2:0);
  pairs.push({entries,selected,score,connection:related[key]||'Die Kombination gibt beiden ausgewählten Interessen einen eigenen fachlichen Schwerpunkt.'});
 }
 return pairs.sort((a,b)=>b.score-a.score)[0];
}
function chips(){
 if(!c.children.length){
  areas.forEach(area=>{
   const button=document.createElement('button');
   button.type='button';button.textContent=area;
   button.addEventListener('click',()=>pick(area));c.append(button);
  });
 }
 [...c.children].forEach((button,i)=>{
  const selected=f.includes(areas[i]);
  button.classList.toggle('on',selected);
  button.setAttribute('aria-pressed',String(selected));
  button.disabled=f.length===2&&!selected;
 });
 document.querySelector('#choice').textContent=f.length+'/2';
 const h=document.querySelector('#hint');
 h.setAttribute('aria-live','polite');h.setAttribute('aria-atomic','true');
 h.replaceChildren();h.className='hint';
 if(f.length!==2){h.textContent=f.length===1?'Wähle ein zweites Interesse für deine Empfehlung.':'Wähle zwei Themen und entdecke eine Kombination aus zwei Schwerpunkten.';return;}
 const result=recommend();
 h.className='hint focus-recommendation';h.style.display='block';
 const heading=document.createElement('strong');heading.textContent='Deine mögliche Schwerpunkt-Kombination';h.append(heading);
 result.entries.forEach((entry,index)=>{
 const name=document.createElement('strong');name.textContent=entry[0];
 h.append(name);
 const i=result.selected[index];
  const line=document.createElement('span');line.style.display='block';line.style.marginTop='10px';
  line.textContent=areas[i]+': '+(entry[3][i]||'Hier ist die Verbindung zu den veröffentlichten Lehrinhalten eher indirekt.')+'.';
  h.append(line);
 const link=document.createElement('a');
 link.href='https://business.thws.de/bachelor-betriebswirtschaft/studienschwerpunkte/'+entry[1]+'/';
 link.textContent='Inhalte bei der THWS ansehen →';link.style.display='block';link.style.marginTop='12px';link.style.textDecoration='underline';
 h.append(link);
 });
 const note=document.createElement('span');note.style.display='block';note.style.marginTop='16px';
 note.textContent=result.connection+' Eine Orientierung anhand der Lehrinhalte, keine verbindliche Studienplanung. Prüfe Sprache, Voraussetzungen, Kombinierbarkeit und aktuelles Angebot bei der THWS.';
 h.append(note);
}
// Replace legacy inline handlers once; subsequent renders retain keyboard focus.
c.replaceChildren();chips();
