function updateTotalByBox() {
  const totalAmount = document.getElementById('total-amount');
  const topBox = document.getElementById('top-box');
  const middleBox = document.getElementById('middle-box');
  const bottomBox = document.getElementById('bottom-box');
  if (topBox.classList.contains('expanded')) {
    totalAmount.textContent = '$10.00';
  } else if (middleBox.classList.contains('expanded')) {
    totalAmount.textContent = '$18.00';
  } else if (bottomBox.classList.contains('expanded')) {
    totalAmount.textContent = '$30.00';
  }
}

document.querySelectorAll('.box').forEach(box => {
  // Prevent box collapse when clicking inside select elements in the box
  box.querySelectorAll('select').forEach(select => {
    select.addEventListener('click', e => {
      e.stopPropagation();
    });
  });

  box.addEventListener('click', () => {
    // Collapse all other boxes
    document.querySelectorAll('.box').forEach(b => {
      if (b !== box) b.classList.remove('expanded');
    });

    // Toggle current box
    box.classList.toggle('expanded');

    // Interactivity for hiding/showing options in all boxes
    const topOptions = document.querySelector('#top-box .pair-offer-options-wrapper');
    const middleOptions = document.querySelector('#middle-box .pair-offer-options-wrapper');
    const bottomOptions = document.querySelector('#bottom-box .pair-offer-options-wrapper');

    // Hide all options by default
    topOptions.classList.add('hidden-pair-options');
    middleOptions.classList.add('hidden-pair-options');
    bottomOptions.classList.add('hidden-pair-options');

    // Show options for the expanded box
    if (box.classList.contains('expanded')) {
      if (box.id === 'top-box') {
        topOptions.classList.remove('hidden-pair-options');
      } else if (box.id === 'middle-box') {
        middleOptions.classList.remove('hidden-pair-options');
      } else if (box.id === 'bottom-box') {
        bottomOptions.classList.remove('hidden-pair-options');
      }
    }

    // Set the radio bullet to the clicked box (all radios in the box)
    document.querySelectorAll('.box').forEach(b => {
      b.querySelectorAll('.pair-radio').forEach(radio => {
        radio.checked = (b === box);
      });
    });

    // Update total when box is expanded/collapsed
    updateTotalByBox();
  });
});

// Update total when selecting in any box
const allSelects = document.querySelectorAll('.box select');
allSelects.forEach(select => {
  select.addEventListener('change', updateTotalByBox);
});

