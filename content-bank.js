// Curated starter bank for Classes 1–10. Content is grouped by age band and subject;
// each grade receives an age-appropriate set. This is a broad practice bank, not a claim of exhaustive board-syllabus coverage.
const subjects = {
 'Mathematics': {
  low:[
   ['Counting and place value','What is the value of the digit 3 in 43?',['3 ones','3 tens','4 tens','30 tens'],1,'The 3 is in the tens place, so its value is 30.','Look at the digit immediately to the left of the ones place.'],
   ['Addition','What is 18 + 7?',['24','25','26','27'],1,'18 + 7 = 25. You can add 2 to reach 20, then add the remaining 5.','Count on from 18 by 7.'],
   ['Subtraction','There are 15 apples. You give away 6. How many remain?',['8','9','10','11'],1,'15 − 6 = 9 apples remain.','Take 5 away to reach 10, then take 1 more.'],
   ['Fractions','Which fraction means one out of four equal parts?',['1/2','1/3','1/4','4/1'],2,'The denominator 4 means four equal parts; numerator 1 means one part.','The bottom number tells how many equal parts make the whole.'],
   ['Shapes','How many sides does a triangle have?',['2','3','4','5'],1,'A triangle has three straight sides and three corners.','Tri means three.'],
   ['Measurement','Which is the best unit for measuring the length of a pencil?',['Kilometres','Centimetres','Litres','Kilograms'],1,'Centimetres are suitable for a small object such as a pencil.','Choose a unit of length, not capacity or mass.']
  ],
  mid:[
   ['Fractions','What is 3/4 of 20?',['5','10','15','16'],2,'20 ÷ 4 = 5, then 5 × 3 = 15.','Find one quarter first, then multiply by 3.'],
   ['Decimals','What is 2.5 + 1.75?',['3.25','4.25','4.75','3.75'],1,'Align decimal points: 2.50 + 1.75 = 4.25.','Write 2.5 as 2.50 before adding.'],
   ['Geometry','A rectangle is 8 cm long and 3 cm wide. What is its perimeter?',['11 cm','22 cm','24 cm','16 cm'],1,'Perimeter = 2 × (8 + 3) = 22 cm.','Add all four sides.'],
   ['Percentages','What is 20% of 150?',['15','20','30','50'],2,'10% of 150 is 15, so 20% is 30.','Find 10%, then double it.'],
   ['Ratios','The ratio is 2:3 and the total is 25. What is the smaller share?',['5','10','12','15'],1,'There are 5 total parts; each is 25 ÷ 5 = 5. The smaller share is 2 × 5 = 10.','Add the ratio parts first.'],
   ['Algebra','If x + 7 = 19, what is x?',['10','11','12','26'],2,'Subtract 7 from both sides: x = 19 − 7 = 12.','Undo the addition by subtracting 7.']
  ],
  high:[
   ['Linear equations','Solve 3x − 5 = 16.',['5','6','7','8'],2,'Add 5 to get 3x = 21, then divide by 3: x = 7.','Isolate the term containing x in two steps.'],
   ['Pythagoras','A right triangle has shorter sides 6 cm and 8 cm. What is the hypotenuse?',['9 cm','10 cm','12 cm','14 cm'],1,'c² = 6² + 8² = 100, so c = 10 cm.','Use a² + b² = c².'],
   ['Probability','A fair six-sided die is rolled. What is the probability of an even number?',['1/6','1/3','1/2','2/3'],2,'Three of the six outcomes (2, 4, 6) are even, so 3/6 = 1/2.','Count favourable outcomes out of all outcomes.'],
   ['Quadratics','What are the roots of x² − 9 = 0?',['3 only','−3 only','−3 and 3','0 and 9'],2,'x² = 9 gives x = ±3.','Both positive and negative numbers can square to 9.'],
   ['Statistics','The values are 4, 6, 6, 8, 11. What is the median?',['4','6','7','8'],1,'The ordered middle value is 6.','There are five ordered values; choose the third.'],
   ['Trigonometry','In a right triangle, sin θ equals:',['Adjacent/hypotenuse','Opposite/hypotenuse','Opposite/adjacent','Hypotenuse/opposite'],1,'Sine is opposite side divided by hypotenuse.','Remember SOH-CAH-TOA.']
  ]
 },
 'Science': {
  low:[
   ['Living things','Which part of a plant usually absorbs water from soil?',['Flower','Root','Fruit','Leaf'],1,'Roots absorb water and minerals from the soil.','Think about the part that grows underground.'],
   ['Materials','Which material is usually transparent?',['Wood','Clear glass','Cardboard','Stone'],1,'Clear glass lets most light pass through so objects can be seen.','Which option lets you see through it?'],
   ['Human body','Which organ pumps blood around the body?',['Lungs','Brain','Heart','Stomach'],2,'The heart contracts to move blood through blood vessels.','It beats continuously.'],
   ['Forces','What force pulls objects towards Earth?',['Friction','Gravity','Magnetism','Buoyancy'],1,'Gravity attracts objects with mass towards Earth.','It is why dropped objects fall.'],
   ['Environment','Which action helps reduce waste?',['Throwing everything away','Reusing a bottle','Leaving lights on','Burning plastic'],1,'Reusing items reduces the amount of waste produced.','Choose the action that uses an item again.'],
   ['Energy','Which is a source of light?',['Moon by itself','Sun','Mirror','Book'],1,'The Sun produces its own light; a mirror reflects light.','Which object emits its own light?']
  ],
  mid:[
   ['Photosynthesis','Which materials do green plants use in photosynthesis?',['Oxygen and sugar','Carbon dioxide and water','Nitrogen and salt','Protein and oxygen'],1,'Plants use carbon dioxide and water with light energy to make glucose and release oxygen.','Remember the gases entering and leaving a leaf.'],
   ['Electricity','A charge of 12 C passes a point in 4 s. What is the current?',['2 A','3 A','8 A','48 A'],1,'I = Q/t = 12/4 = 3 A.','Current equals charge divided by time.'],
   ['Matter','Which change is usually a chemical change?',['Ice melting','Water boiling','Iron rusting','Sugar dissolving'],2,'Rusting forms new substances, so it is a chemical change.','Ask whether a new substance is formed.'],
   ['Sound','Sound travels fastest through which of these?',['Vacuum','Air','Water','Steel'],3,'Sound generally travels faster through solids than liquids or gases, and cannot travel through a vacuum.','Compare the particle spacing and interactions.'],
   ['Ecosystems','In a food chain, green plants are usually:',['Producers','Primary consumers','Decomposers','Predators'],0,'Plants make their own food using light energy, so they are producers.','They begin many food chains.'],
   ['Light','When light enters glass from air at an angle, it usually bends:',['Towards the normal','Away from the normal','Back along the same path','Into darkness'],0,'Light slows down entering glass and bends towards the normal.','Glass is optically denser than air.']
  ],
  high:[
   ['Ohm’s law','A 12 V supply is connected to a 4 Ω resistor. What current flows?',['0.33 A','3 A','8 A','48 A'],1,'I = V/R = 12/4 = 3 A.','Rearrange V = IR to find I.'],
   ['Genetics','If B is dominant over b, which genotype is heterozygous?',['BB','bb','Bb','None'],2,'Bb contains one dominant and one recessive allele, so it is heterozygous.','Heterozygous means two different alleles.'],
   ['Chemistry','A solution with pH 2 is best described as:',['Strongly acidic','Neutral','Weakly alkaline','Strongly alkaline'],0,'A pH below 7 is acidic; pH 2 is strongly acidic.','Values below 7 are acids.'],
   ['Ecology','What is the likely effect of removing most predators from an ecosystem?',['Prey always disappear','Prey populations may rise','Plants stop photosynthesis','Energy is created'],1,'With fewer predators, prey populations may increase and affect the ecosystem balance.','Think about what limits prey numbers.'],
   ['Waves','A wave has frequency 5 Hz and wavelength 2 m. What is its speed?',['2.5 m/s','7 m/s','10 m/s','20 m/s'],2,'Wave speed = frequency × wavelength = 5 × 2 = 10 m/s.','Use v = fλ.'],
   ['Electric power','A device uses 2 A at 6 V. What is its power?',['3 W','8 W','12 W','24 W'],2,'P = VI = 6 × 2 = 12 W.','Power equals voltage times current.']
  ]
 },
 'Physics': null, 'Chemistry': null, 'Biology': null,
 'Social Studies': {
  low:[
   ['Maps','What does a map key explain?',['Map symbols','Weather tomorrow','A country’s laws','The map’s age only'],0,'A map key or legend explains what the symbols and colours mean.','Look for the guide to symbols.'],
   ['Community','Which service helps put out fires?',['Library','Fire service','Post office','Museum'],1,'Fire services respond to fires and related emergencies.','Think of the people who use fire engines.'],
   ['History','Which source is a primary historical source?',['A diary written at the time','A modern textbook summary','A fictional film','A recent review'],0,'A diary made during the period is a first-hand source.','It was created by someone close to the event.'],
   ['Environment','Which is a renewable resource?',['Coal','Petroleum','Sunlight','Natural gas'],2,'Sunlight is naturally replenished and is renewable.','It is available again without being used up like fossil fuels.'],
   ['Civics','Why do communities need rules?',['To make everyone identical','To support safety and fairness','To stop all discussion','To remove responsibilities'],1,'Rules help people live and work together safely and fairly.','Choose the purpose that helps people coexist.'],
   ['Geography','Which instrument is used to find direction?',['Thermometer','Compass','Ruler','Rain gauge'],1,'A compass indicates directions using a magnetic needle.','It points approximately north.']
  ],
  mid:[
   ['Democracy','In a democracy, citizens commonly choose representatives through:',['Elections','Inheritance only','Lottery in every case','Military orders'],0,'Elections allow citizens to choose their representatives.','Think about how people express their political choice.'],
   ['Climate','Weather differs from climate because climate describes:',['Conditions over a long period','Only today’s rain','One hour of wind','A single storm'],0,'Climate describes long-term patterns of weather in a region.','Think years rather than hours or days.'],
   ['Economics','If demand rises while supply stays the same, price will often:',['Fall','Rise','Become zero','Never change'],1,'All else equal, higher demand with unchanged supply tends to push price upward.','More buyers are competing for the same supply.'],
   ['History','Why do historians compare multiple sources?',['To remove all evidence','To check reliability and differing perspectives','To guarantee every source is true','To avoid asking questions'],1,'Comparing sources helps identify bias, corroborate claims and notice disagreement.','One source may be incomplete or biased.'],
   ['Resources','Which is an example of conservation?',['Wasting clean water','Protecting a wetland','Cutting every tree','Dumping waste in a river'],1,'Protecting a wetland preserves habitats and natural resources.','Choose the action that protects ecosystems.'],
   ['Trade','A country exports goods when it:',['Sells goods to other countries','Buys goods from abroad','Stops all production','Only trades within one town'],0,'Exports are goods or services sold to buyers in other countries.','Imports come in; exports go out.']
  ],
  high:[
   ['Constitution','A constitution primarily establishes:',['Basic rules and institutions of government','Daily weather forecasts','All market prices','Individual school timetables'],0,'A constitution defines governing structures, powers, rights and principles.','Think of the framework for how a state is governed.'],
   ['Economics','Inflation is a sustained increase in:',['The general price level','Only one product’s quality','The number of forests','A currency’s physical size'],0,'Inflation is a sustained rise in the general level of prices.','It is broader than one item becoming expensive.'],
   ['Geography','Why do coastal regions often have milder temperatures?',['The sea heats and cools more slowly than land','They receive no sunlight','Wind never reaches them','Salt removes heat'],0,'Water has a high specific heat capacity, moderating nearby temperatures.','Compare how quickly land and water change temperature.'],
   ['History','What does corroboration mean in historical research?',['Checking a claim against other evidence','Inventing missing evidence','Ignoring contradictory sources','Copying one account'],0,'Corroboration compares independent sources to assess a claim.','Look for cross-checking.'],
   ['Civics','Separation of powers is intended to:',['Prevent excessive concentration of power','Remove the judiciary','End public participation','Make laws secret'],0,'Distributing powers among branches creates checks and balances.','Think checks on any one branch becoming too powerful.'],
   ['Sustainable development','Sustainable development aims to meet present needs while:',['Protecting future generations’ ability to meet theirs','Using every resource immediately','Ignoring environmental impacts','Stopping all economic activity'],0,'It balances present well-being with long-term environmental and social needs.','The key idea is future generations.']
  ]
 },
 'English': {
  low:[
   ['Parts of speech','In “The bright sun shines,” which word describes the sun?',['The','bright','sun','shines'],1,'“Bright” is an adjective because it describes the noun “sun”.','Find the word that tells what the sun is like.'],
   ['Punctuation','Which sentence is punctuated correctly?',['where are you.','Where are you?','where are you?','Where are you,'],1,'A direct question begins with a capital letter and ends with a question mark.','Check the capital letter and question mark.'],
   ['Vocabulary','Which word is closest in meaning to “happy”?',['Joyful','Angry','Tired','Afraid'],0,'Joyful means feeling or showing happiness.','Choose a synonym.'],
   ['Grammar','Choose the correct word: “She ___ to school every day.”',['go','goes','going','gone'],1,'With “she” in the simple present, the verb is “goes”.','Remember the third-person singular ending.'],
   ['Reading','A character who shares their lunch is most likely being:',['Generous','Careless','Greedy','Impatient'],0,'Sharing food suggests generosity.','Use the action as evidence of the trait.'],
   ['Sentence building','Which is a complete sentence?',['Because it rained','The little blue','Birds build nests.','Running quickly'],2,'“Birds build nests” has a subject and a complete predicate.','Look for a complete thought.']
  ],
  mid:[
   ['Tenses','Choose the correct form: “They ___ the match yesterday.”',['win','wins','won','winning'],2,'“Yesterday” signals the simple past: won.','Look for the time clue.'],
   ['Subject-verb agreement','Choose the correct sentence.',['The list of items are long.','The list of items is long.','The list are long.','The items is long.'],1,'The subject is “list”, singular, so it takes “is”.','Find the main subject, not the nearby noun.'],
   ['Vocabulary','The word “reluctant” most nearly means:',['Unwilling','Excited','Certain','Careless'],0,'Reluctant means hesitant or unwilling to do something.','Think of someone who does not really want to proceed.'],
   ['Inference','If dark clouds gather and people open umbrellas, what is most likely happening?',['It may rain','It is midnight','A festival began','The sun is getting hotter'],0,'The clues suggest rain is expected or already falling.','Combine the clues in the sentence.'],
   ['Figures of speech','“The classroom was a zoo” is an example of:',['Metaphor','Simile','Alliteration','Rhyme'],0,'It compares the classroom to a zoo without using “like” or “as”.','It is a direct figurative comparison.'],
   ['Writing','A persuasive paragraph should mainly include:',['A clear claim and supporting reasons','Only unrelated facts','No conclusion','Random sentences'],0,'A persuasive paragraph makes a claim and supports it with reasons or evidence.','Think about what could convince a reader.']
  ],
  high:[
   ['Literary analysis','An unreliable narrator is one whose account:',['May be distorted or incomplete','Is always scientifically proven','Contains no viewpoint','Must be written in verse'],0,'An unreliable narrator may misunderstand, conceal or distort events.','Consider whether the reader can trust the account fully.'],
   ['Grammar','Which sentence uses the semicolon correctly?',['I was tired; I went to bed early.','I was; tired I went to bed early.','I was tired; because I slept.','I; was tired, I went to bed.'],0,'A semicolon can join two closely related independent clauses.','Both sides should be able to stand as sentences.'],
   ['Argument','Which is the strongest evidence for a claim about school transport?',['A relevant survey with clear methods','One anonymous rumour','An unrelated personal story','A slogan'],0,'Relevant data gathered transparently is stronger than rumours or unrelated anecdotes.','Check relevance and reliability.'],
   ['Rhetoric','Repeating the opening phrase across several clauses is called:',['Anaphora','Onomatopoeia','Oxymoron','Euphemism'],0,'Anaphora is repetition at the beginning of successive clauses or phrases.','The repeated words appear at the start.'],
   ['Editing','Which revision is most concise?',['Due to the fact that it rained, we stayed in.','Because it rained, we stayed in.','It was raining, and due to this fact we stayed in.','Rain was the reason why we stayed indoors inside.'],1,'“Because it rained” expresses the same cause with fewer words.','Remove unnecessary phrases.'],
   ['Tone','A passage using “perhaps,” “might,” and “it seems” most likely has a tone that is:',['Cautious or tentative','Absolutely certain','Mocking in every case','Commanding'],0,'These qualifiers signal uncertainty or careful qualification.','Notice the writer avoids absolute claims.']
  ]
 }
};
subjects.Physics=subjects.Science; subjects.Chemistry=subjects.Science; subjects.Biology=subjects.Science;
const tiersFor=g=>Number(g)<=3?'low':Number(g)<=6?'mid':'high';
function buildBank(grade,subject){
 const tier=tiersFor(grade),key=subjects[subject]?subject:'Science',rows=subjects[key][tier];
 return rows.map((r,i)=>({id:`g${grade}-${key.toLowerCase().replace(/[^a-z]/g,'')}-${tier}-${i}`,grade:Number(grade),subject:key,c:`${key} · ${r[0]}`,cn:r[0],d:i<2?1:i<4?2:3,t:r[1],o:r[2],ans:r[3],explanation:r[4],simple:r[4],hint:r[5],topic:r[0]}));
}
module.exports={buildBank,subjects};
