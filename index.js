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
	const homeKazananlarArr = [];
	const awayKazananlarArr = [];

	for (let i = 0; i< finallerCb(fifaDataArr).length;i++){
		if(finallerCb(fifaDataArr)[i]['Home Team Goals']>finallerCb(fifaDataArr)[i]['Away Team Goals']){
			homeKazananlarArr.push(finallerCb(fifaDataArr)[i]['Home Team Name'])
		} else if (finallerCb(fifaDataArr)[i]['Home Team Goals']<finallerCb(fifaDataArr)[i]['Away Team Goals']){
			awayKazananlarArr.push(finallerCb(fifaDataArr)[i]['Away Team Name'])
		} 
	}
	const tumKazananlarArr = homeKazananlarArr.concat(awayKazananlarArr);
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

console.log('deneme',herYilinKazananiArray);

}
YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalFunc=(FinallerCb(fifaDataArr))) {

const totalGoals = (finalFunc.reduce((total,score)=>{
return total+(score['Home Team Goals']+score['Away Team Goals'])},0)/finalFunc.length).toFixed(2);

return totalGoals;
}

 console.log('Gorev 6 - OrtalamaGolSayisi',OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data,takimKisaltmalari) {
	
	
   
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


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
