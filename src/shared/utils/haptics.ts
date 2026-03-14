export function hapticLight() {
  if ('vibrate' in navigator) navigator.vibrate(10);
}

export function hapticMedium() {
  if ('vibrate' in navigator) navigator.vibrate(20);
}

export function hapticSuccess() {
  if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
}

export function hapticError() {
  if ('vibrate' in navigator) navigator.vibrate([30, 50, 30]);
}
