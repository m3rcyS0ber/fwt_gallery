<script setup lang="ts"></script>

<template>
  <a href="/fwt_gallery" aria-label="logo" class="logo"></a>
</template>

<style scoped lang="scss">
@use "../../styles/helpers/prepareTheme" as *;
body {
  @include getThemeInBody using ($theme) {
    .logo {
      background-color: map-get($theme, icon-fill);
      -webkit-mask: url(../../assets/logo.svg) no-repeat center;
      mask: url(../../assets/logo.svg) no-repeat center;
    }
  }
}
.logo {
  width: 91px;
  height: 20px;
}

@media (max-width: 767px) {
  .logo {
    width: 73px;
    height: 16px;
  }
}
</style>
