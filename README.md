# CLI STANDALONE SINGLE FILE

ng generate component shared/components/input-text --standalone --skip-tests --inline-template --inline-style
ng g c shared/components/input-text --standalone -s -t --flat

PARAGRAPH

<!-- h1 - Main Page Title -->
<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">This is an H1 heading</h1>

<!-- h2 - Section Titles -->
<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">This is an H2 heading</h2>

<!-- h3 - Subsection Titles -->
<h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">This is an H3 heading</h3>

<!-- h4 - Smaller Subsection Titles -->
<h4 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">This is an H4 heading</h4>

<!-- Paragraph - Standard Text -->
<p class="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
  This is a paragraph. It will resize based on the screen size for better readability.
</p>

<!-- Span - Inline Text -->
<span class="text-sm sm:text-base md:text-lg lg:text-xl">
  This is a span element.
</span>

COLORS

<section class="p-8">
  <!-- h1 with Slate 800 -->
  <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-800">
    Welcome to Our Website
  </h1>

  <!-- h2 with Slate 600 -->
  <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-slate-600">
    Discover Our Services
  </h2>

  <!-- p with Slate 500 -->
  <p class="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-500 mb-8">
    Our services are designed to provide the best experience possible. Whether you're looking for web development, design,
    or consulting, we have you covered.
  </p>

  <!-- span with Slate 500 -->
  <p class="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-500">
    <span class="font-semibold text-slate-800">Innovation</span> and <span class="text-slate-600">Quality</span> are our top priorities.
  </p>
</section>
