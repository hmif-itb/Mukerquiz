<template>
  <div class="strip">
    <div class="columns is-desktop">
      <div class="column has-text-right" :class="bgImg"></div>
      <div class="column is-three-fifths-desktop is-half-tablet has-text-right bg-blue">
        <h2 class="subtitle is-size-4-mobile is-marginless is-italic has-text-centered-mobile">
          <b>{{ result }}</b>
        </h2>
        <p class="desc is-size-4-widescreen is-size-5 has-text-centered-mobile">{{ description }}</p>
        <p class="is-size-4-widescreen is-size-5 has-text-centered-mobile">
          <b>Kadept : {{ directors }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const resultDetails = {
  "Tech": {
    imageName: "tech",
    desc:
      "Departemen Technology berperan untuk meningkatkan minat dan bakat anggota HMIF dalam bidang keilmuan, perlombaan, dan keprofesian yang berdasarkan rasa keingintahuan dan semangat eksplorasi.",
    directors: "Mr. Lebih Jago Ngoding Dibanding Lo"
  },
  "IIT": {
    imageName: "iit",
    desc:
      "Sebuah Digital Incubation Lab yang menerima tawaran proyek perangkat lunak berbasis web, mobile, dan desktop. IIT tahun ini juga menambah fungsi sebagai wadah pengembangan karya warga HMIF. Selengkapnya dapat dikunjungi website kami : inkubatorit.com	",
    directors: "Bapak Terdepan HMIF"
  },
  "Eksternal": {
    imageName: "eksternal",
    desc: "Pintu yang menghubungkan HMIF ITB dengan pihak di luar HMIF ITB",
    directors: "Prabowo Mondardo (Follow cuy! @prabowomondardo)"
  },
  "Internal": {
    imageName: "internal",
    desc: "Pilar yang menopang pemenuhan kebutuhan anggota HMIF melalui kegiatan kegiatan Haha Hihi.",
    directors:
      "Bapak Tiap 10 detik harus di sensor"
  },
  "Senator Team": {
    imageName: "senator",
    desc: "Eks badan resmi HMIF yang kerjaannya tukang julidin KM ama main FIFA di sekre 2.",
    directors: "Bapak Mantan Angmud"
  },
  "Media and Creative": {
    imageName: "medkref",
    desc:"HMIF memerlukan wadah untuk mempublikasikan informasi ke pihak internal maupun eksternal. Departemen Medinfo ada untuk memenuhi kebutuhan informasi warga HMIF.",
    directors: "Ibu Jangan bikin ketawa"
  },
  "Kesekjenan": {
    imageName: "kesekjenan",
    desc:"Supporting system dalam keberjalanan keorganisasian HMIF sehingga tercapai HMIF yang bersinergi harmonis",
    directors: "Bapak 10 bulan hamil"
  },
  "People and Culture": {
    imageName: "pnc",
    desc:"Departemen yang mengatur tentang pendidikan dan pengembangan diri setiap anggota himpunan, terutama staff aktif.",
    directors: "Bapak bintang iklan pantene baru pulang haji"
  }
};

export default {
  name: "ResultStrip",
  props: {
    result: String
  },
  computed: {
    description() {
      return resultDetails[this.result].desc;
    },
    directors() {
      return resultDetails[this.result].directors;
    },
    bgImg() {
      return `bg-${resultDetails[this.result].imageName}`;
    }
  }
};
</script>

<style scoped>
h2,
p,
b {
  font-family: "Montserrat", sans-serif !important;
}

.strip {
  position: absolute;
  width: 100vw;
  background: transparent;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
  /* transition: 0.2s all; */
  animation: fly-in 0.3s ease-in-out;
  animation-fill-mode: both;
}

.columns {
  margin: 0 !important;
}

.column {
  padding: 48px !important;
  height: 100%;
  min-height: 52vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.desc {
  padding: 32px 0;
}

@keyframes fly-in {
  from {
    transform: translateY(50px) translateX(-50%);
    opacity: 0.5;
  }
  to {
    transform: translateX(-50%);
    opacity: 1;
  }
}

@media screen and (max-width: 991px) {
  .column {
    min-height: 50vh;
    padding: 36px !important;
  }

  .strip {
    height: auto;
    position: relative;
    width: initial;
    margin-top: 24px;
  }
}

@media screen and (max-width: 767px) {
  .column {
    min-height: 30vh;
  }
}

.bg-blue,
.bg-tech,
.bg-iit,
.bg-eksternal,
.bg-internal,
.bg-kesenatoran,
.bg-medkref,
.bg-kesekjenan,
.bg-pnc {
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.bg-blue {
  background-image: url("../assets/result-kanan.png");
}
.bg-tech {
  background-image: url("../assets/director/tech.png");
}

.bg-iit {
  background-image: url("../assets/director/iit.png");
}
.bg-eksternal {
  background-image: url("../assets/director/eksternal.png");
}
.bg-internal {
  background-image: url("../assets/director/internal.png");
}
.bg-kesenatoran {
  background-image: url("../assets/director/kesenatoran.png");
}
.bg-medkref {
  background-image: url("../assets/director/medkref.png");
}
.bg-kesekjenan {
  background-image: url("../assets/director/kesekjenan.png");
}
.bg-pnc {
  background-image: url("../assets/director/pnc.png");
}
</style>