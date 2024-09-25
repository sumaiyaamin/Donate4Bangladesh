function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const isOpen = content.style.maxHeight;

 
  const allContents = document.querySelectorAll('.accordion-content');
  allContents.forEach(item => {
      item.style.maxHeight = null;
      item.previousElementSibling.querySelector('span').textContent = '➕'; 
  });

 
  if (isOpen) {
      content.style.maxHeight = null;
      button.querySelector('span').textContent = '➕'; 
  } else {
      content.style.maxHeight = content.scrollHeight + "px"; 
      button.querySelector('span').textContent = '➖'; 
  }
}
