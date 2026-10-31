const C=[
['current','Electric current',[],['charge','flow','ampere','same']],
['pd','Potential difference',['current'],['energy','per charge','volt','battery']],
['res','Resistance',['current'],['opposes','length','area','material']],
['ohm',"Ohm's law",['pd','res'],['v=ir','proportional','constant','temperature']],
['series','Series circuits',['ohm'],['same current','add','one path','sum']],
['par','Parallel circuits',['ohm'],['same voltage','branch','reciprocal','split']],
['pow','Electric power',['ohm'],['i2r','vi','watt','rate']],
['refl','Reflection',[],['normal','equal','angle of incidence','law']],
['mirror','Mirrors & images',['refl'],['virtual','same size','laterally','focus']],
['refr','Refraction',['refl'],['speed','denser','normal','bends']],
['lens','Lenses',['refr'],['converge','convex','focus','diverge']],
['lensf','Lens formula',['lens'],['1/v','1/u','focal','sign']]
].map(([id,name,pre,kw])=>({id,name,pre,kw}));
const M={M1:'Thinks current is used up as it flows through a component',M2:'Confuses potential difference with current (voltage "flows")',M3:'Thinks resistance depends on the current through it',M4:'Thinks parallel branches share voltage like series share current',M5:'Believes more resistance always means more power',M6:'Measures reflection angles from the surface, not the normal',M7:'Thinks a plane mirror image is smaller than the object',M8:'Thinks light bends away from the normal entering a denser medium',M9:'Thinks a convex lens always forms a virtual image',M10:'Ignores sign convention in the lens formula'};
const Q=[
['current',1,'Current entering a bulb in a series circuit is 2 A. The current leaving it is:',[['Less than 2 A, some is used up','M1'],['Exactly 2 A',0],['More than 2 A',0]],1],
['current',2,'Charge of 12 C flows past a point in 4 s. The current is:',[['48 A',0],['3 A',0],['8 A',0]],1],
['pd',1,'Potential difference across a cell is best described as:',[['Current that flows through the cell','M2'],['Energy given per unit charge',0],['Total charge in the wire','M2']],1],
['res',1,'Doubling the length of a wire (same material, same area) its resistance:',[['Halves',0],['Stays the same',0],['Doubles',0]],2],
['res',2,'A resistor has 2 A through it and then 4 A. Its resistance (constant temp):',[['Doubles','M3'],['Stays the same',0],['Halves','M3']],1],
['ohm',2,'V = 12 V and R = 4 ohm. The current is:',[['48 A',0],['3 A',0],['8 A',0]],1],
['series',2,'Two 6 ohm resistors in series across 12 V. Current is:',[['4 A',0],['1 A',0],['2 A',0]],1],
['par',2,'Two 6 ohm resistors in parallel have equivalent resistance:',[['12 ohm',0],['3 ohm',0],['6 ohm',0]],1],
['par',3,'Two bulbs in parallel across a 6 V battery. The voltage across each is:',[['3 V','M4'],['6 V',0],['12 V','M4']],1],
['pow',2,'In a fixed 10 V supply, which resistor dissipates more power?',[['100 ohm','M5'],['10 ohm',0],['Same power',0]],1],
['refl',1,'A ray hits a mirror with 30 degrees to the surface. The angle of reflection (from the normal) is:',[['30 degrees','M6'],['60 degrees',0],['90 degrees',0]],1],
['mirror',1,'An object is 10 cm from a plane mirror. The image is:',[['Smaller, 5 cm behind','M7'],['Same size, 10 cm behind',0],['Bigger, 20 cm behind','M7']],1],
['refr',2,'Light enters glass from air at an angle. It bends:',[['Away from the normal','M8'],['Towards the normal',0],['Does not bend',0]],1],
['lens',2,'An object beyond 2F of a convex lens forms an image that is:',[['Virtual and upright','M9'],['Real and inverted',0],['Virtual and inverted','M9']],1],
['lensf',3,'Object at u = -30 cm, f = +10 cm. Using 1/v - 1/u = 1/f, v is:',[['+15 cm',0],['-15 cm','M10'],['+7.5 cm',0]],0]
].map((q,i)=>({id:'q'+i,c:q[0],d:q[1],t:q[2],o:q[3].map(x=>x[0]).concat([]),m:q[3].map(x=>x[1]),ans:q[4]}));
// insert the correct option at its index: rebuild options with the answer text
const A={q0:'Exactly 2 A',q1:'3 A',q2:'Energy given per unit charge',q3:'Doubles',q4:'Stays the same',q5:'3 A',q6:'2 A',q7:'3 ohm',q8:'6 V',q9:'10 ohm',q10:'60 degrees',q11:'Same size, 10 cm behind',q12:'Towards the normal',q13:'Real and inverted',q14:'+15 cm'};
module.exports={C,M,Q,A};
