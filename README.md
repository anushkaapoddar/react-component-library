# React Component Library

A modern React component library built with TypeScript, TailwindCSS, and Storybook.

## Features

- **InputField**: Customizable input component with various states and variants
- **DataTable**: Flexible data table with sorting and selection capabilities
- **TypeScript**: Full type safety
- **TailwindCSS**: Modern styling with utility classes
- **Storybook**: Component documentation and testing
- **Accessible**: ARIA support and keyboard navigation
- **Responsive**: Mobile-first design

## Installation

```bash
npm install
```

## Development

Start Storybook:
```bash
npm run storybook
```

Run tests:
```bash
npm test
```


Build the library:
```bash
npm run build
```

## Components
🔹 InputField

A versatile input component with multiple variants, sizes, and states.
```bash
<InputField
  label="Email"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
  helperText="We'll never share your email"
/>
```
🔹 DataTable

A flexible data table with sorting, selection, and loading states.
```bash
<DataTable
  data={users}
  columns={columns}
  selectable
  onRowSelect={handleSelection}
/>
```

## Live Preview

Check out the [Storybook Preview](https://68b0860cf200e033c6950fe2-oickhpfkof.chromatic.com/)

## Testing

Run all tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Deployment

This project uses Chromatic for Storybook deployment:
```bash
npm run chromatic
```

## License

MIT License – feel free to use this component library in your projects.
