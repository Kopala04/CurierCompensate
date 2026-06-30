function calculateVenuePickupLate(pickUpDistanceKm) {
  if (pickUpDistanceKm <= 2) {
    return 0.5;
  }

  return 0.8 + (pickUpDistanceKm - 2) * 0.4;
}

function calculateLateness(latenessMinutes, baseCompensation, increment) {
  if (latenessMinutes < 15) {
    return { kind: 'none' };
  }

  if (latenessMinutes === 15) {
    return { kind: 'amount', amount: baseCompensation };
  }

  const compensation =
    baseCompensation + Math.floor((latenessMinutes - 15) / 5) * increment;

  return { kind: 'amount', amount: compensation };
}

const calculatorOptions = [
  {
    id: 'venue-pickup-late',
    title: 'Cancellation + Distance',
    inputLabel: 'Cancellation + Distance',
    inputUnit: 'km',
    inputStep: '0.1',
  },
  {
    id: 'cancellation-venue-late-cyp',
    title: 'Cancellation + Venue Late',
    region: 'CYP',
    inputLabel: 'Venue lateness',
    inputUnit: 'minutes',
    inputStep: '1',
  },
  {
    id: 'cancellation-venue-late-malta',
    title: 'Cancellation + Venue Late',
    region: 'MALTA',
    inputLabel: 'Venue lateness',
    inputUnit: 'minutes',
    inputStep: '1',
  },
  {
    id: 'customer-lateness-cyp',
    title: 'Customer Lateness',
    region: 'CYP',
    inputLabel: 'Customer lateness',
    inputUnit: 'minutes',
    inputStep: '1',
  },
  {
    id: 'customer-lateness-malta',
    title: 'Customer Lateness',
    region: 'MALTA',
    inputLabel: 'Customer lateness',
    inputUnit: 'minutes',
    inputStep: '1',
  },
];

const latenessRates = {
  'cancellation-venue-late-cyp': { base: 0.75, increment: 0.25 },
  'cancellation-venue-late-malta': { base: 0.8, increment: 0.4 },
  'customer-lateness-cyp': { base: 0.75, increment: 0.25 },
  'customer-lateness-malta': { base: 0.8, increment: 0.4 },
};

function calculate(type, value) {
  if (type === 'venue-pickup-late') {
    return calculateVenuePickupLate(value);
  }

  const { base, increment } = latenessRates[type];
  return calculateLateness(value, base, increment);
}

function formatEuro(amount) {
  return `€${amount.toFixed(2)}`;
}

function formatResult(option, value) {
  const result = calculate(option.id, value);

  if (option.id === 'venue-pickup-late') {
    return formatEuro(result);
  }

  if (result.kind === 'none') {
    return formatEuro(0);
  }

  return formatEuro(result.amount);
}
