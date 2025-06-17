document.addEventListener('DOMContentLoaded', function () {
  if (
		!navigator.userAgent
			.toLowerCase()
			.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)
	) {
    const circle = document.getElementById('cursor-circle');
    let flag = false;
    window.addEventListener('mousemove', (e) => {
      if (!flag) {
        flag = true
        circle.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;

        const target = document.elementFromPoint(e.clientX, e.clientY);

        if (target?.closest('.hover-target, button, a, [role="button"]')) {
          circle.classList.add('active');
        } else {
          circle.classList.remove('active');
        }
        flag = false
      }
    });
  }
})

