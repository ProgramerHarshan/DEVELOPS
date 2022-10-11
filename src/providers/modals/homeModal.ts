import { Surfaces, Blocks, Elements, Bits } from 'slack-block-builder';

export function homeModal(): any {
    return Surfaces.Modal({title: 'My App', submit: 'Submit'})
    .callbackId('home_modal_callback')
    .blocks(
        Blocks.Section().text('Your Details Please.'),
        Blocks.Input({ label: 'Name' })
        .element(
          Elements.TextInput({ placeholder: "Enter your Name" })
            .actionId('name_action')
        ).blockId('name_block'),
        Blocks.Input({ label: 'Sex' })
        .element(
          Elements.StaticSelect({ placeholder: 'Select Please' })
            .actionId('gender_action')
            .options(
                Bits.Option({text: 'Male', value: 'Male'}),
                Bits.Option({text: 'Female', value: 'Female'}),
                Bits.Option({text: 'Third Gender', value: 'Third Gender'})
            )
        ),
        Blocks.Section()
         .text('Your Date of Birth Please')
         .accessory(
            Elements.DatePicker({ placeholder: "Select a date" }).actionId('datepicker-action')),
        Blocks.Section()
            .text('This is a section block with a button.')
            .accessory(
                Elements.Button({ text: 'Click Me', value: 'click_me_123', url: 'https://google.com'})
            ),
    )
    .buildToJSON();
}