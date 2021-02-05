Vue.config.productionTip = false

var app = new Vue({
  el: '#app',
  data: {
    choice0: "c0-v1",
    choice1: [
      {val: "c1-v1"}
    ],
    select1: [
      {value:'c1-v1', text:'Физическое лицо'},
      {value:'c1-v2', text:'Юридическое лицо'},
      {value:'c1-v3', text:'Государственный орган (орган местного самоуправления)'},
      {value:'c1-v4', text:'Индивидуальный предприниматель'},
    ],
    choice2: [
      {val: "c2-v3"}
    ],
    select2: [
      {value:'c2-v3', text:'Физическое лицо'},
      {value:'c2-v4', text:'Юридическое лицо'},
      {value:'c2-v5', text:'Государственный орган (орган местного самоуправления)'},
      {value:'c2-v6', text:'Индивидуальный предприниматель'},
    ],
    choice3: [
      {val: "c3-v1"}
    ],
    select3: [
      {value:'c3-v1', text:'Физическое лицо'},
      {value:'c3-v2', text:'Юридическое лицо'},
      {value:'c3-v3', text:'Государственный орган (орган местного самоуправления)'},
      {value:'c3-v4', text:'Индивидуальный предприниматель'},
    ],
    choice4: [
      {val: "c4-v3"}
    ],
    select4: [
      {value:'c4-v3', text:'Физическое лицо'},
      {value:'c4-v4', text:'Юридическое лицо'},
      {value:'c4-v5', text:'Государственный орган (орган местного самоуправления)'},
      {value:'c4-v6', text:'Индивидуальный предприниматель'},
    ],
    choice5: "c5-v1",
    choice6: "c6-v1",
    choice61: [],
    choice7: ["c7-v1"],
    show_opt1: false,
    show_opt23: false,
    show_opt4: false,
    choice7options: [
      {option1: ''},
      {option2: ''},
      {option3: ''},
      {option4: ''},
    ],
    choice8: ["c8-v1"],
    choice9: "c9-v1",
    choice10: "c10-v1",
    choice11: "c11-v1",
    needs_tax: true,
    needs_price_7: true,
    // about_possesions: true,
    needs_price_8: true,

    download_available: false,

    auto_refresh: true,

    updating: false,
    error: false,
  },
  methods: {
    show: function (node_id) {
      document.getElementById(node_id).style.display = "";
    },
    hide: function (node_id) {
      document.getElementById(node_id).style.display = "none";
    },
    click: function (node_id) {
      document.getElementById(node_id).click()
    },
    onChange1() {
      if (this.auto_refresh) {
        this.updatePDF()
      }

      this.needs_tax = true
      for (let i = 0; i < this.choice1.length; i++) {
        if (this.choice1[i].val === 'c1-v3') {
          this.needs_tax = false
          this.choice6 = 'c6-v29'
        }
      }
    },
    onChange2() {
      if (this.auto_refresh) {
        this.updatePDF()
      }

      var show = false
      for (let i = 0; i < this.choice2.length; i++) {
        if (this.choice2[i].val === 'c2-v3') {
          show = true;
        }
      }
      if (show) {
        document.getElementById('c2-h1').style.display = ''
      } else {
        document.getElementById('c2-h1').style.display = 'none'
      }
    },
    onChange3() {
      if (this.auto_refresh) {
        this.updatePDF()
      }
    },
    onChange4() {
      if (this.auto_refresh) {
        this.updatePDF()
      }
    },
    onChange7() {
      // if (this.choice7.includes('c7-v2')) {
      //   document.getElementById('c7-h1').style.display = ''
      // } else {
      //   document.getElementById('c7-h1').style.display = 'none'
      // }

      // if (this.choice7.includes('c7-v15')) {
      //   document.getElementById('c7-h2').style.display = ''
      // } else {
      //   document.getElementById('c7-h2').style.display = 'none'
      // }

      // if (this.choice7.includes('c7-v16')) {
      //   document.getElementById('c7-h3').style.display = ''
      // } else {
      //   document.getElementById('c7-h3').style.display = 'none'
      // }

      // if (this.choice7.includes('c7-v20')) {
      //   document.getElementById('c7-h4').style.display = ''
      // } else {
      //   document.getElementById('c7-h4').style.display = 'none'
      // }

      if (this.choice7.length == 0) {
        this.choice7.push('c7-v1')
      }

      if (this.choice7.some(el => 
          ['c7-v1','c7-v2','c7-v3',
           'c7-v4','c7-v5','c7-v6',
           'c7-v7','c7-v7','c7-v9',
           'c7-v10','c7-v11','c7-v12',
           'c7-v13','c7-v14','c7-v15', 
           'c7-v17', 'c7-v18', 'c7-v24',
          ].includes(el))) {
        this.needs_price_7 = true;
      } else {
        this.needs_price_7 = false;
      }

      if (this.needs_price_7 || this.needs_price_8) {
        this.choice5 = 'c5-v1'
        document.getElementById('c5-v1').click()
      } else {
        this.choice5 = 'c5-v2'
        document.getElementById('c5-v2').click()
      }

      // console.log('NEEDS PRICE?')
      // console.log(this.needs_price_7 || this.needs_price_8)
    },
    onChange8() {

      if (this.choice8.includes('c8-v3') || this.choice8.includes('c8-v6')) {
        this.needs_price_8 = false;
      } else {
        this.needs_price_8 = true;
      }

      if (this.needs_price_7 || this.needs_price_8) {
        this.choice5 = 'c5-v1'
        document.getElementById('c5-v1').click()
      } else {
        this.choice5 = 'c5-v2'
        document.getElementById('c5-v2').click()
      }

      // console.log('NEEDS PRICE?')
      // console.log(this.needs_price_7 || this.needs_price_8)
    },

    closeUpdateAlarm: function() {
      this.updating = false
    },

    updatePDF: function() {
      if (!this.download_available) {
        this.download_available = true
      }


      this.updating = true
      this.error = false

      f = document.forms[1]
      var bodyFormData = new FormData(f)
      bodyFormData.delete('c7-block1-radio')
      bodyFormData.delete('choice-61')
      axios({
        method: 'post',
        url: document.URL + 'front/',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
        // console.log(response)
        getPDF()
      })
      .catch(function (response) {
        //handle error
        app.updating = false
        // app.error = true
        // alert('Что-то пошло не так ¯\\_(ツ)_/¯')
        // document.location.reload(true);
        // console.log(response)
      });
    },

    download: function() {
      window.location.href="download-doc/"
    },
  },
  mounted: function mounted () {
    document.getElementById('c2-v1').click()
    document.getElementById('c4-v1').click()
    // alert(this.choice0)
    this.updatePDF()
  },
})
