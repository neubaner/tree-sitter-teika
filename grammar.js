const PRECS = {
  SEMI: 4,
  FUNC: 3,
  ANNOT: 2,
  APPLY: 1,
}

module.exports = grammar({
  name: 'teika',
  extras: $ => [
    /\s+/
  ],
  conflicts: $ => [
    [$._term_rec_semi, $._term_rec_annot],
  ],
  rules: {
    source_file: $ => $._term,
    _term: $ => $._term_rec_pair,
    _term_rec_pair: $ => choice(
      $._term_rec_both,
      $.term_pair,
    ),
    _term_rec_both: $ => choice(
      $._term_semi_or_annot,
      $.term_both,
    ),
    _term_semi_or_annot: $ => choice(
      $._term_rec_annot,
      $.term_semi
    ),
    _term_rec_semi: $ => choice(
      $._term_rec_funct,
      $.term_semi
    ),
    _term_rec_semi_bind: $ => choice(
      $._term_rec_annot,
      $.term_bind,
    ),
    _term_rec_annot: $ => choice(
      $._term_rec_funct,
      $.term_annot,
    ),
    _term_rec_funct: $ => choice(
      $._term_rec_apply,
      $.term_forall,
      $.term_lambda
    ),
    _term_rec_apply: $ => choice(
      $._term_atom,
      $.term_apply
    ),
    _term_atom: $ => choice(
      $.term_var,
      $.term_extension,
      $.term_string,
      $.term_number,
      $._term_parens,
      $.term_braces,
    ),
    term_var: $ => /[a-zA-Z_][\w_]*/,
    term_extension: $ => seq('%', /[a-zA-Z_][\w_]*/),
    term_forall: $ => seq($._term_rec_apply, '->', $._term_rec_funct),
    term_lambda: $ => seq($._term_rec_apply, '=>', $._term_rec_funct),
    term_apply: $ => seq($._term_rec_apply, $._term_atom),
    term_pair: $ => seq($._term_rec_both, ',', $._term_rec_pair),
    term_both: $ => seq($._term_semi_or_annot, '&', $._term_rec_both),
    term_bind: $ => seq($._term_rec_annot, '=', $._term_rec_semi),
    term_semi: $ => seq($._term_rec_semi_bind, ';', $._term_rec_semi),
    term_annot: $ => seq($._term_rec_funct, ':', $._term_rec_annot),
    term_string: $ => seq('"', /[^"]*/, '"'),
    term_number: $ => /\d+/,
    _term_parens: $ => seq('(', $._term, ')'),
    term_braces: $ => seq('{', $._term, '}'),
  }
})

