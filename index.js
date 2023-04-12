const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
	const yilStageFiltre = fifaData.filter((data)=> {
		return data.Year === 2014 && data.Stage === "Final";
	});
	//console.log(yilStageFiltre);

	//console.log('Home Team Name - ',yilStageFiltre[0]['Home Team Name']);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
	//console.log('Away Team Name - ',yilStageFiltre[0]['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
	//console.log('Away Team Goals - ',yilStageFiltre[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
	//console.log('Home Team Goals - ',yilStageFiltre[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
let kazanan;
if(yilStageFiltre[0]['Home Team Goals']>yilStageFiltre[0]['Away Team Goals']){
	kazanan = yilStageFiltre[0]['Home Team Name']
}else{
	kazanan = yilStageFiltre[0]['Away Team Name']
}

	//console.log('Winner - ',kazanan);


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/


function Finaller(arr) {
	
	let filtreDizi = arr.filter((data)=>{
		return data.Stage === 'Final';});

	return filtreDizi;
	}
	

console.log('Gorev 2 - Finaller',Finaller(fifaData));


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaDataArr,finallerCb) {
	
	//For Dongusu ile Calisma
	//const yillarArr = [];
	// for (let i = 0; i < finallerCb(fifaDataArr).length;i++){
	// 	yillarArr.push(finallerCb(fifaDataArr)[i].Year);	
	// }
	//Filter ile Calisma
	const yillarArr = finallerCb(fifaDataArr).map(data => {
		return data.Year;
	}); 

	return yillarArr;
}

console.log('Gorev 3 - Yillar',Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(fifaDataArr,finallerCb) {
	// const homeKazananlarArr = [];
	// const awayKazananlarArr = [];

	// for (let i = 0; i< finallerCb(fifaDataArr).length;i++){
	// 	if(finallerCb(fifaDataArr)[i]['Home Team Goals']>finallerCb(fifaDataArr)[i]['Away Team Goals']){
	// 		homeKazananlarArr.push(finallerCb(fifaDataArr)[i]['Home Team Name'])
	// 	} else if (finallerCb(fifaDataArr)[i]['Home Team Goals']<finallerCb(fifaDataArr)[i]['Away Team Goals']){
	// 		awayKazananlarArr.push(finallerCb(fifaDataArr)[i]['Away Team Name'])
	// 	} 
	// }
	// const tumKazananlarArr = homeKazananlarArr.concat(awayKazananlarArr);
	
	const tumKazananlarArr=[];
		
	for (let i = 0; i< finallerCb(fifaDataArr).length;i++){
		if(finallerCb(fifaDataArr)[i]['Home Team Goals']>finallerCb(fifaDataArr)[i]['Away Team Goals']){
			tumKazananlarArr.push(finallerCb(fifaDataArr)[i]['Home Team Name'])
		} else if (finallerCb(fifaDataArr)[i]['Home Team Goals']<finallerCb(fifaDataArr)[i]['Away Team Goals']){
			tumKazananlarArr.push(finallerCb(fifaDataArr)[i]['Away Team Name'])
		} else{
			tumKazananlarArr.push(finallerCb(fifaData)[i]['Win conditions'].split(' win')[0]);
		}
	}
	

	return tumKazananlarArr;
}

console.log('Gorev 4 - Kazananlar',Kazananlar(fifaData,Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaDataArr,finallerCb,yillarCb,kazananlarCb) {

	const herYilinKazananiArray = [];
	let kazananCumlesi;
	
	for (let i = 0; i< yillarCb(fifaDataArr,finallerCb).length;i++){	
		kazananCumlesi = `${yillarCb(fifaDataArr,finallerCb)[i]} yılında, ${kazananlarCb(fifaDataArr,finallerCb)[i]} dünya kupasını kazandı!`
		herYilinKazananiArray.push(kazananCumlesi);
	}

//console.log('deneme',herYilinKazananiArray);

return herYilinKazananiArray;

}
console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar));




/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalFunc = Finaller(fifaData)) {
const totalGoals = (finalFunc.reduce((total,score)=>{
return total+(score['Home Team Goals']+score['Away Team Goals'])},0)/finalFunc.length).toFixed(2);

return totalGoals;

}

 console.log('Gorev 6 - OrtalamaGolSayisi',OrtalamaGolSayisi());

// Opsiyon 2 Mac basi gol sayisini bulmak
//  function OrtalamaGolSayisi2(callback) {
//   const macBasiGol = callback.map(val => {
//     return val["Home Team Goals"] + val["Away Team Goals"];
//   });

//   console.log(macBasiGol);
// }
// OrtalamaGolSayisi2(Finaller(fifaData));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

//Kendi denemem--------

function UlkelerinKazanmaSayilari(data,takimKisaltmalari) {
	
	const finalYillar = Finaller(fifaData);
	
	const tumKazananlarArr=Kazananlar(fifaData,Finaller);
	
	const tumKazananlarKisaltmaArr = [];
	for (let i =0; i<tumKazananlarArr.length; i++){
		if(tumKazananlarArr[i]=== finalYillar[i]['Home Team Name']){
			tumKazananlarKisaltmaArr.push(finalYillar[i]['Home Team Initials'])
		}else{
			tumKazananlarKisaltmaArr.push(finalYillar[i]['Away Team Initials'])
		}
	}
	console.log(tumKazananlarKisaltmaArr);
	
	let tumKazananlarKisaltmaTekrar = tumKazananlarKisaltmaArr.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
		console.log(acc);
    return acc;
},{});

return `${takimKisaltmalari} kazanma sayisi : ${tumKazananlarKisaltmaTekrar[takimKisaltmalari]}`;
	}
	  
console.log('Bonus 1 -',UlkelerinKazanmaSayilari(fifaData,'ITA'));

// // Etut Cozumu ---------------------
// 	function UlkelerinKazanmaSayilari(data, initial) {
// 		let finalTakimlarList = Kazananlar(fifaData, Finaller).slice();
// 		let finalTakimlarKazanmaSayilari = {};
// 		let initialList = {};
// 		let returnListe = {};
// 		let result = {};
	
// 		for (let i = 0; i < finalTakimlarList.length; i++) {
// 			if (finalTakimlarList[i] in finalTakimlarKazanmaSayilari) {
// 				finalTakimlarKazanmaSayilari[finalTakimlarList[i]] += 1;
// 			} else {
// 				finalTakimlarKazanmaSayilari[finalTakimlarList[i]] = 1;
// 			}
// 		}
// 		console.log('finalTakimlarKazanmaSayilari',finalTakimlarKazanmaSayilari);
	
// 		for (let i = 0; i < data.length; i++) {
// 			if (data[i]["Home Team Name"] in initialList === false) {
// 				initialList[data[i]["Home Team Name"]] = data[i]["Home Team Initials"];
// 			} else if (data[i]["Away Team Name"] in initialList === false) {
// 				initialList[data[i]["Away Team Name"]] = data[i]["Away Team Initials"];
// 			}
// 		}
// 		console.log('Initial List',initialList);

// 		for (const key in finalTakimlarKazanmaSayilari) {
// 			returnListe[initialList[key]] = finalTakimlarKazanmaSayilari[key];
// 		}
// 		console.log('returnListe',returnListe);
	
// 		result = initial + ": " + returnListe[initial];
// 		return result;
// 	}
// 	console.log(
// 		"Bonus 1 Kazanma Sayısı ITA",
// 		UlkelerinKazanmaSayilari(fifaData, "ITA")
// 	);
	



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

////Kendi Denemem1
// function EnCokGolAtan(fifaData) {
	
//   const finalYillar = Finaller(fifaData);
// 	const tumKazananlarArr=Kazananlar(fifaData,Finaller);
// 	const liste={};

// 	tumKazananlarArr.forEach((sira)=>{
// 		liste[sira]=0;

// 		for(let i= 0; i<finalYillar.length;i++ ){
// 			if(sira ==finalYillar[i]['Home Team Name']){
// 				liste[sira]+=finalYillar[i]['Home Team Goals']
// 			}
// 		}
// 		for(let i= 0; i<finalYillar.length;i++ ){
// 			if(sira ==finalYillar[i]['Away Team Name']){
// 				liste[sira]+=finalYillar[i]['Away Team Goals']
// 			}
// 		}
// 	});
// 	console.log('gol',liste)
	
// 	const golArray = Object.values(liste);
// 	const takimArray = Object.keys(liste);
// 	let maxGolAtanTakim;
	
// 	for (let i = 0; i<golArray.length; i++){
// 		if(Math.max(...golArray)== golArray[i]){
// 			maxGolAtanTakim = `${takimArray[i]} ${golArray[i]} golle en fazla gol atan takim`
// 		}
// 	}
// 		return maxGolAtanTakim;
// 	}
	
	
// console.log('En cok Gol Atan',EnCokGolAtan(fifaData));

////Kendi Denemem2

function EnCokGolAtan(fifaData) {
	
  const finalYillar = Finaller(fifaData);
	console.log('final Yillar',finalYillar);
	const tumKazananlarArr=Kazananlar(fifaData,Finaller).filter((ulkeler,index) => {return Kazananlar(fifaData,Finaller).indexOf(ulkeler)==index;
	});
	console.log('tumkazananlar',tumKazananlarArr);
	let liste ={};
	tumKazananlarArr.forEach((takim)=>{
		liste[takim] = finalYillar.reduce((p,c)=>{
		if(takim == c['Home Team Name']){
			p = p+c['Home Team Goals']
		} if(takim == c['Away Team Name']){
			p = p+c['Away Team Goals']
		}
		return p;
	},0);
});
console.log('deneme',liste);

//console.log(liste);
	return liste;
}
console.log('En cok Gol Atan',EnCokGolAtan(fifaData));

////Kendi Denemem2-1
// function EnCokGolAtan(fifaData) {
//   const finalYillar = Finaller(fifaData);
//   const tumKazananlarArr=Kazananlar(fifaData,Finaller);
//   let liste =[];
//   liste = tumKazananlarArr.forEach((takim)=>{
//     liste[takim] =finalYillar.reduce((p,c)=>{
//     if(takim == c['Home Team Name']){
//       return p+c['Home Team Goal']
//     } else{
//       return p;
//     }
//   },0);
// });

// //console.log(liste);
//   return liste;
// }
// console.log('En cok Gol Atan',EnCokGolAtan(fifaData));

// // Etut

// function EnCokGolAtan(data) {
//   let finalOynayanTakimlar = {};

//   for (let i = 0; i < data.length; i++) {
//     if (data[i]["Stage"] === "Final") {
//       finalOynayanTakimlar[data[i]["Home Team Name"]] = 0;
//       finalOynayanTakimlar[data[i]["Away Team Name"]] = 0;
//     }
//   }
// 	console.log(finalOynayanTakimlar);

//   for (let i = 0; i < data.length; i++) {
//     if (data[i]["Stage"] === "Final") {
//       finalOynayanTakimlar[data[i]["Home Team Name"]] +=
//         data[i]["Home Team Goals"];
//     }
//   }
// 	console.log(finalOynayanTakimlar);

//   for (let i = 0; i < data.length; i++) {
//     if (data[i]["Stage"] === "Final") {
//       finalOynayanTakimlar[data[i]["Away Team Name"]] +=
//         data[i]["Away Team Goals"];
//     }
//   }
// 	console.log(finalOynayanTakimlar);
//   let enCokGolAtanTakimAdi = Object.keys(finalOynayanTakimlar)[0];

// 	console.log('aaa',enCokGolAtanTakimAdi)

//   for (let i = 0; i < Object.keys(finalOynayanTakimlar).length; i++) {
//     if (
//       finalOynayanTakimlar[Object.keys(finalOynayanTakimlar)[i]] >
//       finalOynayanTakimlar[enCokGolAtanTakimAdi]
//     ) {
//       enCokGolAtanTakimAdi = Object.keys(finalOynayanTakimlar)[i];
//     }
//   }

//   let result =
//     enCokGolAtanTakimAdi + ": " + finalOynayanTakimlar[enCokGolAtanTakimAdi];
//   return result;
// }
// console.log("Bonus 2 Finalde EnCokGolAtan", EnCokGolAtan(fifaData));

/*  BONUS 3: 



/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(fifaData) {
	const finalYillar = Finaller(fifaData);
	const tumKazananlarArr=Kazananlar(fifaData,Finaller);
	const liste={};

	tumKazananlarArr.forEach((sira)=>{
		liste[sira]=0;

		for(let i= 0; i<finalYillar.length;i++ ){
			if(sira ==finalYillar[i]['Home Team Name']){
				liste[sira]+=finalYillar[i]['Away Team Goals']
			}
		}
		for(let i= 0; i<finalYillar.length;i++ ){
			if(sira ==finalYillar[i]['Away Team Name']){
				liste[sira]+=finalYillar[i]['Home Team Goals']
			}
		}
	});
	console.log('gol',liste)
	
	const golArray = Object.values(liste);
	const takimArray = Object.keys(liste);
	let maxGolYiyenTakim;
	
	for (let i = 0; i<golArray.length; i++){
		if(Math.max(...golArray)== golArray[i]){
			maxGolYiyenTakim = `${takimArray[i]} ${golArray[i]} kalesine gol yiyerek en fazla gol yiyen takim`
		}
	}
		return maxGolYiyenTakim;
	
}
console.log('En kotu Defans',EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
