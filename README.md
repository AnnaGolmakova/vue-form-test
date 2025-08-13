# Promocode Form Test Case

![Screenshot](./docs/screenshot.png)

A Vue 3 form for creating promotional codes with multi-step form validation, built with modern web standards and accessibility in mind.

[View on Github Pages](https://annagolmakova.github.io/vue-form-test/)

### Key Features

- **Multi-step form** with step-by-step validation
- **Form validation** using Vee-validate and Yup
- **Native browser elements** for better accessibility and UX
- **Responsive design** with modern CSS features
- **Native modal dialogs** with built-in accessibility
- **Auto-resizing textarea** using pure CSS
- **Accessibility** - semantic HTML and proper ARIA support

## 🛠 Technical Implementation

Framework & Libraries

- **Vue 3**
- **Vee-validate** - Form validation library
- **Yup** - Schema validation
- **TypeScript**

### Form Validation with Vee-validate and Yup

The form validation is handled using [Yup schemas](./src/schema/promocode.ts) defined in `src/schema/promocode.ts`:

```typescript
export const promocodeSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Укажите название промокода")
    .max(30, "Не больше 30 символов"),
  title: yup
    .string()
    .trim()
    .required("Заполните заголовок")
    .max(120, "Не больше 120 символов"),
  // ...
});
```

For the expiration date field, conditional validation is implemented using Yup's `.when()` method:

```typescript
end: yup.date().when("isUnlimited", {
  is: true,
  then: (schema) => schema.strip(), // Remove field from result
  otherwise: (schema) =>
    schema.required("Укажите дату окончания или отметьте галку «Без даты конца»"),
}),
```

The validation schema is split into separate schemas for each form step using `.pick()`:

```typescript
const schemas = [
  promocodeSchema.pick(["name", "title", "description", "amount"]),
  promocodeSchema.pick(["start", "end", "isUnlimited", "limit", "sendToUsers"]),
];

const currentSchema = computed(() => schemas[currentStep.value - 1]);
```

### CSS Relative Colors for Hover States

Since the design didn't include hover states for buttons, I [implemented them](./src/components/Button.vue) using CSS relative colors to automatically calculate appropriate hover effects:

```css
button:hover {
  background-color: oklch(from var(--button-default-bg) calc(l - 0.05) c h);
  color: oklch(from var(--button-default-text) calc(l - 0.05) c h);
}
```

How the hover color is calculated:

- Uses the `oklch()` color space
- New color is computed based on the existing color `from var(--button-default-bg)`
- The expression `from ... l c h` extracts three components: `l` (lightness), `c` (chroma/saturation), `h` (hue)
- Only lightness is modified with `calc(l - 0.05)`, making the color lighter or darker depending on context.

Learn more about [relative colors in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl).

### Auto-resizing Textarea with only CSS

[Textarea height](./src/components/TextArea.vue) automatically adjusts to content using modern CSS:

```css
textarea {
  field-sizing: content;
  min-height: calc(3lh + 32px); /* 3 lines + padding */
  max-height: calc(10lh + 32px); /* 10 lines + padding */
  resize: vertical; /* Fallback for older browsers */
}
```

- `field-sizing: content` - automatically grows with content
- `lh` units - relative to line height for consistent spacing
- `resize: vertical` - fallback manual resizing for older browsers

### Native Browser Elements

The project leverages native HTML elements to get browser functionality "for free" while maintaining accessibility.

Instead of implementing a custom calendar component, the project uses native browser date/time inputs. And [modal component](./src/components/Modal.vue) use the native `<dialog>` element.

Native elements provide built-in screen reader support and focus management is handled by the browser. For example native dialogs provides this benefits:

- **Top layer rendering** - automatically rendered above all other content
- **Focus management** - automatic focus trapping within the modal
- **Keyboard navigation** - ESC key handling built-in
- **Screen reader support** - proper ARIA roles and semantics
- **No z-index conflicts** - always rendered on top

Components extend native HTML attributes for full TypeScript support:

```typescript
interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  invalid?: boolean;
  invalidText?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}
```

### Project Structure

```
src/
├── components/          # Reusable UI components
├── forms/               # Application form
│   └── CreatePromocodeForm.vue
├── schema/              # Validation schemas
│   └── promocode.ts
└── ...
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```
