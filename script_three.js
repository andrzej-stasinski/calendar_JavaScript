function Kalendarz () {
var NazwaMiesiaca = [ "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
					"Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "GRUDZIEŃ" ];
var DniWMiesiacu = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DniTygodnia = ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];

var Element = document.querySelector('#kal');
var content = "";

var Dzisiaj = new Date();
this.KolorDnia = "#000088";
this.KolorWolnegoDnia = "#ff0000";
this.KolorTlaDnia = "#ff0";
this.KolorTlaBiezacegoDnia = "#ddddff";
this.KolorTlaWiniety = "#bbffbb";
this.szerokoscKomorki = 20;
this.szerokoscRamki = 140;

this.BiezacaData = new Date();

	this.Wyswietl = function () {

		var Napis;
		var RoboczaData  = new Date();
		var Rok = this.BiezacaData.getFullYear();
		if(Rok < 1900) Rok = 1900 + Rok;
		var Miesiac = this.BiezacaData.getMonth();

		this.dni_w_miesiacu();
		RoboczaData.setDate(1);
		RoboczaData.setMonth(Miesiac);
		RoboczaData.setYear(Rok);

		content += "<table border=0 cellspacing=1 cellpadding=1>";
		content +=  "<tr>";
		content +=  "<td colspan=7 style='text-align:center;background:" + this.KolorTlaWiniety + ";'><b>" + NazwaMiesiaca[Miesiac] + ' ' + Rok;
		content +=  "<tr>";

		for (var i = 1; i<= 6; i++) {
			content +=  "<td style='width:"+this.szerokoscKomorki+"px;background:#eeeeee;text-align:center;'><b>" + DniTygodnia[i];
		}
		content +=  "<td style='width:"+this.szerokoscKomorki+"px;background:#eeeeee;text-align:center;'><b>" + DniTygodnia[0];

		content +=  "<tr>";

		for (var i = 1; i < RoboczaData.getDay(); i++) {
			content += "<td>";
		}
		for (var i = 1; i <= DniWMiesiacu[Miesiac]; i++) {
			RoboczaData.setDate (i);
			if ((RoboczaData.getDate() == Dzisiaj.getDate()) && (RoboczaData.getMonth() == Dzisiaj.getMonth()) && (RoboczaData.getYear() == Dzisiaj.getYear())) {
				Napis = "<td style='text-align:center;background:"+ this.KolorTlaBiezacegoDnia + "';>";
			}
			else {
				Napis = "<td style='text-align:center;background:"+ this.KolorTlaDnia + "';>";
			}
			if (RoboczaData.getDay() == 0) {
				Napis += "<span style='color:" + this.KolorWolnegoDnia + "';>";
			}
			else {
				Napis += "<span style='color:" + this.KolorDnia + "'>";
				}
			Napis += i;
			content += Napis;
			if (RoboczaData.getDay() == 0) {
				content += "<tr>";
			}
		}
		content += "</table>";
		Element.innerHTML = content;
		Element.style.width = this.szerokoscRamki + 'px';
	}

	this.dni_w_miesiacu = function () {
		if ((this.BiezacaData.getFullYear () % 4 == 0) && (this.BiezacaData.getFullYear() % 100 != 0)) {
			DniWMiesiacu[1] = 29;
		}
		else {
			DniWMiesiacu[1] = 28;
		}
	}

	this.UstawDate = function (Miesiac, Rok) {
		this.BiezacaData.setMonth (Miesiac - 1);
		this.BiezacaData.setYear (Rok);
	}

	this.BiezacyMiesiac = function () {
		this.BiezacaData.setDate (Dzisiaj.getDate());
		this.BiezacaData.setMonth (Dzisiaj.getMonth());
		this.BiezacaData.setFullYear (Dzisiaj.getFullYear());
	}

	this.PoprzedniMiesiac  = function () {
		if (this.BiezacaData.getMonth() == 0) {
			this.BiezacaData.setMonth(11);
			this.BiezacaData.setYear(this.BiezacaData.getYear() - 1);
		}
		else
		{
			// tak było i generowało błąd dla dat 31 month o 30 march
			//this.BiezacaData.setMonth (this.BiezacaData.getMonth() - 1);

			// solution
			this.BiezacaData.setDate(1);
			this.BiezacaData.setMonth (this.BiezacaData.getMonth() - 1);			
		}
	}

	this.NastepnyMiesiac  = function () {
		if (this.BiezacaData.getMonth () == 11) {
			this.BiezacaData.setMonth(0);
			this.BiezacaData.setYear (this.BiezacaData.getYear() + 1);
		}
		else
		{
			// tak było, co generowało błąd - zobacz test w oryginale opisany
			// byłąd dla daty 31.1.2016 dawało marzec zamiast luty
			//this.BiezacaData.setMonth (this.BiezacaData.getMonth() + 1);

			// solution
			this.BiezacaData.setDate(1);
			this.BiezacaData.setMonth (this.BiezacaData.getMonth() + 1);
		}
	}

	this.UstawKolorTlaBiezacegoDnia = function (kolor) {
		this.KolorTlaBiezacegoDnia = kolor;
	}
	this.UstawKolorDnia = function (kolor) {
		this.KolorTlaDnia = kolor;
	}	
	this.UstaSzerokoscKomorki = function(szer) {
		this.szerokoscKomorki = szer;
	}
	this.ustawRamke = function() {
		this.szerokoscRamki = 7 * this.szerokoscKomorki;
	}
}


var K = new Kalendarz();
K.UstawKolorTlaBiezacegoDnia ("pink");
K.UstawKolorDnia('white');
K.UstaSzerokoscKomorki(40);
K.ustawRamke();
K.PoprzedniMiesiac();
K.Wyswietl();
K.BiezacyMiesiac();
K.Wyswietl();
K.NastepnyMiesiac();
K.Wyswietl();






