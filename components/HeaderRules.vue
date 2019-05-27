<template>
  <VExpansionPanel>
    <VExpansionPanelContent>
      <template v-slot:header>
        <h2 class="body-2">Rules</h2>
      </template>
      <div class="pt-1 px-4 pb-4">
        <VLayout>
          <VAvatar class="icon mr-2">
            <VIcon>hotel</VIcon>
          </VAvatar>
          <ul class="list">
            <li>No alcohol, smoking, or forbidden possessions.</li>
            <li class="mt-2">Be courteous and don’t inconvenience others.</li>
          </ul>
        </VLayout>
        <VLayout class="mt-3">
          <VAvatar class="icon mr-2">
            <VIcon>person_add</VIcon>
          </VAvatar>
          <ul class="list">
            <li>Joining or dropping at least one week in advance is&nbsp;recommended.</li>
            <li class="mt-2">
              The deadline to drop is the time of check-in.
              If you drop after this point, you will still be required to&nbsp;pay.
            </li>
          </ul>
        </VLayout>
        <VLayout class="mt-3">
          <VAvatar class="icon mr-2">
            <VIcon>local_atm</VIcon>
          </VAvatar>
          <ul class="list">
            <li>
              Prices may fluctuate as attendees add and drop,
              so check back near the con for final&nbsp;rates.
            </li>
            <li class="mt-2">Payment upon arrival is&nbsp;encouraged.</li>
            <li class="mt-2">
              PayPal is ideal, but you can also pay in cash, check, or credit&nbsp;card.
            </li>
          </ul>
        </VLayout>
      </div>
    </VExpansionPanelContent>
  </VExpansionPanel>
</template>

<style lang="scss" scoped>
/deep/ .v-expansion-panel__header {
  @include max-width(sm) {
    @include padding(null 16px);
  }
}

/deep/ .v-expansion-panel__body {
  @include max-width(sm) {
    @include margin(null -8px);
  }
}

.icon {
  @include margin(null -3px);
  flex-shrink: 0;
}

.list {
  @include list-reset;
}
</style>
