
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// axios sluzi da upotrbu HTTP requestova
Vue.use(VueAxios, axios)
// Vuex sluzi za rad sa vue-store-om koji sluzi da stvaranje "baze" podataka za front
Vue.use(Vuex)

/* eslint-disable */
export const store = new Vuex.Store({
    // veliki objekat koji sadrzi atribute neophodne za rad programa state-baza, mutatori-menjanje baze,
    // getteri-uzimanje podataka iz baze, actions -metode koje se pozivaju van store-a za rad sa store-om
    state:{
        ucenici: [],
        opstine: [],
        drzave: [],
        polovi: [],
        mesta: [],
        osnovneSkole: [],
        srednjeSkole: [],
        smer: [],
        razred: [],
        stepeniStrucneSpreme: [],
        postanskiBrojevi: [],
        tipoviPorodice: [],
        // atribut za ukljucivanje stanja ucitavanja prilikom rada sa bazom, obicno za prikazivanje loading stvari
        loading: false,
        // atribut za prikazivanje gresaka prilikom HTTP zahteva sa bazom
        error: null
    },
    // mutacije su metode koje imaju direktan kontakt sa bazom, obicno sluze za cuvanje podataka u bazu
    mutations: {
        // sve setLoaded metode sluze za ubacivanje podataka u State sa backend-a
        setLoadedTipovePorodice (state,payload)
        {
            state.tipoviPorodice=payload
        },
        setLoadedSSS (state,payload)
        {
            state.stepeniStrucneSpreme=payload
        },
        setLoadedRazred (state,payload)
        {
            state.razred=payload
        },
        setLoadedMesta (state,payload)
        {
            state.mesta=payload
        },

        setLoadedOS (state,payload){
            state.osnovneSkole=payload
          
        },
        setLoadedSS (state,payload){
            state.srednjeSkole=payload
          
        },
        setLoadedSmerovi (state,payload){
            state.smer=payload
          
        },
        setLoadedPolove (state,payload){
            state.polovi=payload
          
        },
        setLoadedPostanskeBrojeve (state,payload){
            state.postanskiBrojevi=payload
          
        },
        setLoadedUcenike (state,payload){
            state.ucenici=payload
          
        },
        setLoadedOpstine (state,payload){
            state.opstine=payload
           
        },
        setLoadedDrzave (state,payload){
            state.drzave=payload
           
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error=null
        },
        createUcenik(state,payload)
        {
            // JSON kopiranje objekata gde je payload podatak koji stize sa backend-a
            var novi = JSON.parse(JSON.stringify(payload))
        
            // roditelji u payload-u su u drugacijem formatu te se ovde vrsi mapiranje iz tog resursa u objekat koji sadrzi 2 roditelja
            novi.roditelji=[
                {
                    id:payload.roditelji.idMajke,
                    ime: payload.roditelji.imeMajke,
                    prezime: payload.roditelji.prezimeMajke,
                    brojTelefona: payload.roditelji.brojTelefonaMajke,
                    stepenObrazovanjaId:payload.roditelji.strucnaSpremaMajkeId
                 },
                 {
                    id:payload.roditelji.id,
                    ime: payload.roditelji.imeOca,
                    prezime: payload.roditelji.prezimeOca,
                    brojTelefona: payload.roditelji.brojTelefonaOca,
                    stepenObrazovanjaId:payload.roditelji.strucnaSpremaOcaId
                 }
        
            ]
        
           
            state.ucenici.push(novi)

               
        },
        // brisanje ucenika iz state-a
        deleteUcenik(state,payload)
        {
            state.ucenici.splice(payload.id)
        },
        // mutacija za promenu podataka ucenika iz state-a nakon PUT HTTP zahteva
        editUcenik(state,payload)
        {
            // mapiranje koje vrsi celokupni edit, mozda je moglo da se napravi da se menjaju samo promenjeni podaci
            const ucenikEdit = state.ucenici.find(ucenikEdit => {
                return ucenikEdit.id === payload.id
              })
              ucenikEdit.ime= payload.ime,
              ucenikEdit.prezime= payload.prezime,
              ucenikEdit.jmbg= payload.jmbg,
              ucenikEdit.adresa = payload.adresa,
              ucenikEdit.prethodiUspeh = payload.prethodiUspeh,
              ucenikEdit.smer = {
                    id: payload.smer.id,
                    nazivSmera: payload.smer.nazivSmera
              },
              ucenikEdit.postanskiBroj= {
                    id:payload.postanskiBroj.id,
                    broj:payload.postanskiBroj.broj,
                    opstinaId:payload.postanskiBroj.opstinaId
              },
              ucenikEdit.pol= {
                    id:payload.pol.id,
                    nazivPola:payload.pol.nazivPola
              },            
              ucenikEdit.telefon= {
                    id:payload.telefon.id,
                    mobilni:payload.telefon.mobilni,
                    kucni:payload.telefon.kucni
              },
              ucenikEdit.dan= payload.dan,
              ucenikEdit.mesec= payload.mesec,
              ucenikEdit.godina= payload.godina,
              ucenikEdit.mestoRodjenja= {
                    id: payload.mestoRodjenja.id,
                    nazivMesta: payload.mestoRodjenja.nazivMesta
              },
              ucenikEdit.mestoPrebivalista= {
                    id: payload.mestoPrebivalista.id,
                    nazivMesta: payload.mestoPrebivalista.nazivMesta
              },
              ucenikEdit.prethodnaSkola={
                  id: payload.prethodnaSkola.id,
                  nazivPrethodneSkole: payload.prethodnaSkola.nazivPrethodneSkole,
                  opstinaId: payload.prethodnaSkola.opstinaId

              },
            
              ucenikEdit.upisanaSkola={
                id: payload.upisanaSkola.id,
                nazivSrednjeSkole: payload.upisanaSkola.nazivPrethodneSkole,
                opstinaId: payload.upisanaSkola.opstinaId

              },
              ucenikEdit.mestoZavrseneSkole={
                    id: payload.mestoZavrseneSkole.id,
                    nazivMesta: payload.mestoZavrseneSkole.nazivMesta
              },
              ucenikEdit.opstina= {
                   id: payload.opstina.id,
                   nazivOpstine: payload.opstina.nazivOpstine,
                   postanskiBroj: payload.opstina.postanskiBroj
              },
              ucenikEdit.opstinaPrebivalista= {
                id: payload.opstinaPrebivalista.id,
                nazivOpstine: payload.opstinaPrebivalista.nazivOpstine,
                postanskiBroj: payload.opstinaPrebivalista.postanskiBroj
             },
              ucenikEdit.drzavaRodjenja={
                    id: payload.drzavaRodjenja.id,
                    nazivDrzave: payload.drzavaRodjenja.nazivDrzave
              },
             ucenikEdit.razred={
                 id: payload.razred.id,
                 brojRazreda: payload.razred.brojRazreda
             },
             ucenikEdit.tipPorodice={
                id: payload.tipPorodice.id,
                nazivTipaPorodice: payload.tipPorodice.nazivTipaPorodice
            },
             ucenikEdit.roditelji=[
             
                 {
                    id:payload.roditelji.idMajke,
                    ime: payload.roditelji.imeMajke,
                    prezime: payload.roditelji.prezimeMajke,
                    brojTelefona: payload.roditelji.brojTelefonaMajke,
                    stepenObrazovanjaId:payload.roditelji.strucnaSpremaMajkeId
                 },
                 {
                    id:payload.roditelji.id,
                    ime: payload.roditelji.imeOca,
                    prezime: payload.roditelji.prezimeOca,
                    brojTelefona: payload.roditelji.brojTelefonaOca,
                    stepenObrazovanjaId:payload.roditelji.strucnaSpremaOcaId
                 }

             ],
             ucenikEdit.tipPorodice={
                id: payload.tipPorodice.id,
                nazivTipaPorodice: payload.tipPorodice.nazivTipaPorodice
             },
             ucenikEdit.staratelji= {
             id: payload.staratelji.id,
             ime: payload.staratelji.ime,
             prezime: payload.staratelji.prezime,
             ucenikId: payload.staratelji.ucenikId
             },
             ucenikEdit.slika= payload.slika,
             ucenikEdit.materijalniPrihodi=payload.materijalniPrihodi,
             ucenikEdit.pohvale=payload.pohvale,
             ucenikEdit.kazne=payload.kazne
             
              
        }
        
    },
    // actions su metode koje se pozivaju van store-a da bi se nesto radilo sa store-om primer : this.$store.dispatch('loadedSSS')
    actions: {
        // HTTP GET zahtev za stepene strucne spreme 
        loadedSSS( {commit } ) {
            // commit sluzi za pozivanje mutatacija (mutations) metoda
            // podesavanjem loading na true ulazi se u fazu ucitavanja te se na odgovarajucem mesto prikazuje neki vid loading stanja
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/stepenistrucnespreme').then((response) => {
            // pozivanje mutatora za popunjavanje State-a sa zeljenim podacima, response.data je ono sto stize sa backend-a
              commit('setLoadedSSS', response.data)
              // nakon ucitanih podataka skinuti prikaz stanja loading-a sa odgovarajucih mesta
              commit('setLoading', false)
              // catch greske i prikazi ih na konzoli
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          loadedTipoviPorodice( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/tipoviporodice').then((response) => {
           
              commit('setLoadedTipovePorodice', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za razrede koje ucenik moze da upise
        loadedRazred( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/razredi').then((response) => {
           
              commit('setLoadedRazred', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za sva mesta u Srbiji
        loadedMesta( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/mesta').then((response) => {
           
              commit('setLoadedMesta', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za sve osnovne skole u Srbiji
        loadedOS( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/osnovneskole').then((response) => {
              
              commit('setLoadedOS', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za sve srednje skole u Srbiji
          loadedSS( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/srednjeskole').then((response) => {
            
              commit('setLoadedSS', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
        // HTTP GET zahtev za sve smerove koje ucenik moze upisati u Svilajncu
        loadedSmerovi( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/smerovi').then((response) => {
          
              commit('setLoadedSmerovi', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za sve postanske brojeve u srbiji
        loadedPostanskiBrojevi( {commit } ) {
        commit('setLoading', true)
        axios.get('http://localhost:50146/api/postanskiBrojevi').then((response) => {
         
          commit('setLoadedPostanskeBrojeve', response.data)
          commit('setLoading', false)
          
        }).catch(
            (error) => {
              console.log(error)
              commit('setLoading', false)
                    }
                )
      },
      // HTTP GET zahtev za prikaz polova
        loadedPolovi( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/polovi').then((response) => {
           
              commit('setLoadedPolove', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za sve prijavljene ucenike
        loadedUcenici( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/ucenik').then((response) => {
            
              commit('setLoadedUcenike', response.data)
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                        }
                    )
          },
          // HTTP GET zahtev za sve opstine u Srbiji
          loadedOpstine( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/opstine').then((response) => {
               
              commit('setLoadedOpstine', response.data)
            
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                }
                     )
          },
          // HTTP GET zahtev za sve drzave na svetu
          loadedDrzave( {commit } ) {
            commit('setLoading', true)
            axios.get('http://localhost:50146/api/drzave').then((response) => {
               
              commit('setLoadedDrzave', response.data)
            
              commit('setLoading', false)
              
            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                }
      )
      
          },
          // HTTP POST zahtev za prijavu novog ucenika
        createUcenik ({commit}, payload) {
            // payload je objekat koji stize sa nekih od komponenti zaduzenih za prijavu novog ucenika
            // kreira sa objekat adekvatan za slanje na HTTP POST
            const ucenik = {
                ime: payload.ime,
                prezime: payload.prezime,
                jmbg: payload.jmbg,
                adresa: payload.adresa,
                prethodniUspeh: payload.prethodniUspeh,
                pol: {
                    id: payload.pol.id
                },
                smer: {
                    id: payload.smer.id
                },
                dan: payload.dan,
                mesec: payload.mesec,
                godina: payload.godina,
                mestoRodjenja: {
                    id: payload.mestoRodjenja.id
                },
                mestoPrebivalista: {
                    id: payload.mestoPrebivalista.id
                },
                prethodnaSkola:{
                    id: payload.prethodnaSkola.id
                },
                upisanaSkola:{
                    id: payload.upisanaSkola.id
                },
                mestoZavrseneSkole:{
                    id: payload.mestoZavrseneSkole.id
                },
                opstina: {
                    id: payload.opstina.id,
                },
                drzavaRodjenja: {
                    id: payload.drzavaRodjenja.id
                },
                postanskiBroj: {
                    id: payload.postanskiBroj.id
                },
                telefon: {
                    kucni:payload.telefon.kucni,
                    mobilni:payload.telefon.mobilni
                },
                opstinaPrebivalista: {
                    id: payload.opstinaPrebivalista.id,
               },
               razred:{
                   id: payload.razred.id
               },
               // post resurs zahteva roditelje u objektu koji nije kolekcija vec ima atribute za oca i majku
               roditelji:{
                 
                ImeOca: payload.roditelji[0].ime,
                PrezimeOca: payload.roditelji[0].prezime,
                ImeMajke: payload.roditelji[1].ime,
                PrezimeMajke: payload.roditelji[1].prezime,
                StrucnaSpremaMajkeId: payload.roditelji[1].stepenObrazovanjaId,
                StrucnaSpremaOcaId:  payload.roditelji[0].stepenObrazovanjaId,
                BrojTelefonaMajke: payload.roditelji[0].brojTelefona,
                BrojTelefonaOca: payload.roditelji[1].brojTelefona
               },
               tipPorodice:{
                   id: payload.tipPorodice.id
               },
               staratelji:{
                   ime: payload.staratelji.ime,
                   prezime:  payload.staratelji.prezime
                 
               },
               slika: payload.slika,
               materijalniPrihodi: payload.materijalniPrihodi,
               pohvale: payload.pohvale,
               kazne: payload.kazne
               }
               
               
            commit('setLoading', true)
          
            axios.post('http://localhost:50146/api/ucenik',ucenik, {
                onUploadProgress: uploadEvent =>{
                    console.log('Put request progress:' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%'  )                    
                }
            }).then(function(response){

                console.log(response.data)
                commit('createUcenik', response.data)
                commit('setLoading', false)
                 }).catch(
                    (error) => {
                      console.log(error)
                      commit('setLoading', false)
                    }
          )
  
        },
        // HTTP DELETE zahtev za brisanje prijavljenog ucenika, zahteva ID ucenika koji se brise
        deleteUcenik( {commit },payload ) {
            commit('setLoading', true)
           
            axios.delete('http://localhost:50146/api/ucenik/'+payload).then((response) => {
              
              commit('deleteUcenik', response.data)
              commit('setLoading', false)
            })
          },
          // HTTP PUT zahtev za menjanje podataka prijavljenog ucenika
          editUcenik ({commit}, payload) {
            const ucenik = {
                ime: payload.ime,
                prezime: payload.prezime,
                jmbg: payload.jmbg,
                adresa: payload.adresa,
                prethodniUspeh: payload.prethodniUspeh,
                pol: {
                    id: payload.pol.id
                },
                smer: {
                    id: payload.smer.id
                },
                dan: payload.dan,
                mesec: payload.mesec,
                godina: payload.godina,
                mestoRodjenja: {
                    id: payload.mestoRodjenja.id
                },
                mestoPrebivalista: {
                    id: payload.mestoPrebivalista.id
                },
                prethodnaSkola:{
                    id: payload.prethodnaSkola.id
                },
                upisanaSkola:{
                    id: payload.upisanaSkola.id
                },
                mestoZavrseneSkole:{
                    id: payload.mestoZavrseneSkole.id
                },
                opstina: {
                    id: payload.opstina.id,
                },
                drzavaRodjenja: {
                    id: payload.drzavaRodjenja.id
                },
                postanskiBroj: {
                    id: payload.postanskiBroj.id
                },
                telefon: {
                    kucni:payload.telefon.kucni,
                    mobilni:payload.telefon.mobilni
                },
                opstinaPrebivalista: {
                    id: payload.opstinaPrebivalista.id,
               },
               razred:{
                   id: payload.razred.id
               },
               roditelji:{
                   ucenikID: payload.id,
                   ImeOca: payload.roditelji[1].ime,
                   PrezimeOca: payload.roditelji[1].prezime,
                   ImeMajke: payload.roditelji[0].ime,
                   PrezimeMajke: payload.roditelji[0].prezime,
                   StrucnaSpremaMajkeId: payload.roditelji[1].stepenObrazovanjaId,
                   StrucnaSpremaOcaId:  payload.roditelji[0].stepenObrazovanjaId,
                   BrojTelefonaMajke: payload.roditelji[0].brojTelefona,
                   BrojTelefonaOca: payload.roditelji[1].brojTelefona
               },
               tipPorodice:{
                   id: payload.tipPorodice.id
               },
               staratelji:{
                   ime: payload.staratelji.ime,
                   prezime:  payload.staratelji.prezime,
                   ucenikId:  payload.staratelji.ucenikId
               },
               slika:payload.slika,
               materijalniPrihodi: payload.materijalniPrihodi,
               pohvale: payload.pohvale,
               kazne: payload.kazne
                
            }
          
            commit('setLoading', true)
            axios.put('http://localhost:50146/api/ucenik/'+payload.id, ucenik).then(function(response){
               
                commit('editUcenik', response.data)
                commit('setLoading', false)
                 }).catch(
                    (error) => {
                      console.log(error)
                      commit('setLoading', false)
                    }
          )
    
        }
    },
    // getteri su metode koje sluze za preuzimanje (get-ovanje) podataka iz State-a
    getters: {
        loadedTipoviPorodice (state) {
            return state.tipoviPorodice
        },
        loadedSSS (state) {
            return state.stepeniStrucneSpreme
        },
        loadedRazredi (state) {
            return state.razred
        },
        loadedMesta (state) {
            return state.mesta
        },
        loadedSmer (state)
        {
            return state.smer 
        },
      
        loadedSrednjeSkole (state)
        {
            return state.srednjeSkole  
        },
        loadedOsnovneSkole (state)
        {
            return state.osnovneSkole  
        },
        loadedPolovi (state)
        {          
            return state.polovi  
        },
        loadedPostanskiBrojevi (state)
        {          
            return state.postanskiBrojevi           
        },
        loadedUcenici (state)
    {       
        return state.ucenici       
    }, loadedOpstine (state)
    {     
        return state.opstine       
    }, loadedDrzave (state)
    {      
        return state.drzave       
    },
    loadedUceniciID (state) {
        return (id) => {
            return state.ucenici.find((id) => {
                return ucenik.id===id
            })
        }
    }, loading(state){
        return state.loading
        console.log(state.loading)
    }
    
    }
})