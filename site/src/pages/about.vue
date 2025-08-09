<template>
  <section class="main">
    <div class="container">
      <div class="widget">
        <div class="widget-header">{{ t("pages.about.title") }}</div>
        <div class="widget-content content">
          <p>
            {{ t("pages.about.desc") }}
          </p>
        </div>
      </div>

      <div class="widget">
        <div class="widget-header">{{ t("pages.about.contactTitle") }}</div>
        <div class="widget-content content">
          <p>
            {{ t("pages.about.contactDesc") }}
          </p>
          <ul>
            <li>
              <span>{{ t("pages.about.community") }}</span>
              <a href="https://bbs.portalapi.site" target="_blank">bbs</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
useHead({
  title: t("pages.about.title"),
});
</script>

<style lang="scss" scoped>
.widget {
  .widget-content {
    padding: 16px;
  }
}
</style>
