<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
.stage {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 96px 24px 80px;
  position: relative;
}

.panel {
  width: 100%;
  max-width: 720px;
  text-align: center;
}

.headline {
  font-size: clamp(34px, 4.6vw, 54px);
  line-height: 1.05;
  letter-spacing: -0.028em;
  font-weight: 500;
  margin: 0 0 18px;
  text-wrap: balance;
  color: #1a1714;
}

.sub {
  font-size: clamp(17px, 1.25vw, 17px);
  line-height: 1.5;
  color: #5c564e;
  margin: 0 auto 36px;
  max-width: 520px;
  text-wrap: pretty;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  background: #f2efe9;
  border-radius: 999px;
  padding: 6px 6px 6px 26px;
  transition:
    background 0.18s ease,
    box-shadow 0.18s ease;
}
.search:focus-within {
  background: #ffffff;
  box-shadow:
    0 0 0 1px #e6e1d8,
    0 0 0 5px rgba(194, 65, 12, 0.18);
}
.search input {
  flex: 1;
  border: 0;
  background: transparent;
  outline: none;
  font: inherit;
  font-size: 17px;
  color: #1a1714;
  padding: 22px 12px 22px 0;
  min-width: 0;
}
.search input::placeholder {
  color: #8e867c;
}

.submit {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: #c2410c;
  color: #fff;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}
.submit:hover {
  background: #9a3309;
}
.submit:active {
  transform: scale(0.96);
}
.submit svg {
  display: block;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 24px;
}
.chip {
  appearance: none;
  border: 1px solid #e6e1d8;
  background: transparent;
  color: #1a1714;
  font: inherit;
  font-size: 14px;
  padding: 9px 16px 9px 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}
.chip:hover {
  background: #f2efe9;
  border-color: #dad3c5;
}
.chip .ic {
  width: 14px;
  height: 14px;
  display: inline-block;
  flex: 0 0 14px;
  color: #5c564e;
}
.chip .ic svg {
  display: block;
  width: 100%;
  height: 100%;
}

.micro {
  margin-top: 28px;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #8e867c;
  text-transform: uppercase;
}
.micro span {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #4a8a5e;
  margin-right: 8px;
  transform: translateY(-2px);
  box-shadow: 0 0 0 3px rgba(74, 138, 94, 0.12);
}

@media (max-width: 560px) {
  .stage {
    padding: 110px 18px 40px;
  }
  .headline {
    font-size: 32px;
  }
  .search input {
    font-size: 16px;
    padding: 18px 10px 18px 0;
  }
  .search {
    padding-left: 20px;
  }
  .submit {
    width: 42px;
    height: 42px;
  }
  .micro {
    display: none;
  }
}
</style>
