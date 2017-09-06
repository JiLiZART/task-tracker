<template>
  <span class="hotkey">{{ hotkey }}</span>
</template>

<script>
  import isMac from '@/utils/isMac';
  import isMobileDevice from '@/utils/isMobileDevice';

  const keymap = {
    'command': '⌘',
    'option': '⌥',
    'shift': '⇧',
    'esc': '␛',
    'capslock': '⇪',
    'enter': '⏎',
    'backspace': '⌫',
    'tab': '⇥',
    'control': '⌃'
  };

  const toWinKeymap = {
    'command': 'control'
  };

  export default {
    name: 'hotkey',
    props: ['name'],

    computed: {
      hotkey() {
        if (isMobileDevice()) return '';

        return this.name
          .split('+')
          .map((symbol) => !isMac() && toWinKeymap[symbol] ? toWinKeymap[symbol] : symbol)
          .map((symbol) => keymap[symbol] ? keymap[symbol] : symbol)
          .join(' ')
      }
    }
  }
</script>

<style lang="scss">
  .hotkey {
    font-size: 80%;
    padding: .25rem .33rem;
    text-decoration: none;
    background: rgba(0, 0, 0, .1);
    border-radius: 3px;
  }
</style>
