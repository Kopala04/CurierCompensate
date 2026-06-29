function createRegionBadge(region) {
  const badge = document.createElement('span');
  badge.className = `region-badge region-badge--${region.toLowerCase()}`;
  badge.textContent = region;
  return badge;
}

function createCalculatorRow(option) {
  const row = document.createElement('div');
  row.className = 'row';

  const titleCell = document.createElement('div');
  titleCell.className = 'row-title';

  const title = document.createElement('h2');
  title.textContent = option.title;
  titleCell.appendChild(title);

  if (option.region) {
    titleCell.appendChild(createRegionBadge(option.region));
  }

  const inputCell = document.createElement('div');
  inputCell.className = 'row-input';

  const label = document.createElement('label');
  label.className = 'sr-only';
  label.htmlFor = option.id;
  label.textContent = option.inputLabel;

  const inputWrap = document.createElement('div');
  inputWrap.className = 'input-wrap';

  const input = document.createElement('input');
  input.id = option.id;
  input.type = 'number';
  input.min = '0';
  input.step = option.inputStep || '1';
  input.inputMode = 'decimal';
  input.placeholder = '0';

  const unit = document.createElement('span');
  unit.className = 'input-unit';
  unit.textContent = option.inputUnit;

  const error = document.createElement('p');
  error.className = 'input-error';
  error.hidden = true;

  const resultCell = document.createElement('div');
  resultCell.className = 'row-result';

  const result = document.createElement('p');
  result.className = 'result-placeholder';
  result.textContent = '—';

  function updateResult() {
    const trimmed = input.value.trim();

    if (trimmed === '') {
      error.hidden = true;
      result.className = 'result-placeholder';
      result.textContent = '—';
      return;
    }

    const value = Number(trimmed);

    if (Number.isNaN(value)) {
      error.hidden = false;
      error.textContent = 'Enter a valid number';
      result.className = 'result-placeholder';
      result.textContent = '—';
      return;
    }

    if (value < 0) {
      error.hidden = false;
      error.textContent = 'Cannot be negative';
      result.className = 'result-placeholder';
      result.textContent = '—';
      return;
    }

    error.hidden = true;
    result.className = 'result-value';
    result.textContent = formatResult(option, value);
  }

  input.addEventListener('input', updateResult);

  inputWrap.appendChild(input);
  inputWrap.appendChild(unit);
  inputCell.appendChild(label);
  inputCell.appendChild(inputWrap);
  inputCell.appendChild(error);

  resultCell.appendChild(result);

  row.appendChild(titleCell);
  row.appendChild(inputCell);
  row.appendChild(resultCell);

  return row;
}

function initCalculator() {
  const container = document.getElementById('calculator-rows');

  calculatorOptions.forEach((option) => {
    container.appendChild(createCalculatorRow(option));
  });
}

document.addEventListener('DOMContentLoaded', initCalculator);
