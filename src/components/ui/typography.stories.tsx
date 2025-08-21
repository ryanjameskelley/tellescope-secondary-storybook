import type { Meta, StoryObj } from "@storybook/react";

function TypographyH1() {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      Taxing Laughter: The Joke Tax Chronicles
    </h1>
  );
}

function TypographyH2() {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      The People of the Kingdom
    </h2>
  );
}

function TypographyH3() {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      The Joke Tax
    </h3>
  );
}

function TypographyH4() {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      People stopped telling jokes
    </h4>
  );
}

function TypographyP() {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </p>
  );
}

function TypographyBlockquote() {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      "After all," he said, "everyone enjoys a good joke, so
      it's only fair that they should pay for the privilege."
    </blockquote>
  );
}

function TypographyTable() {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              King's Treasury
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              People's happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Empty
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Overflowing
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Modest
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Satisfied
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Full
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Ecstatic
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TypographyList() {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}

function TypographyInlineCode() {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      @radix-ui/react-alert-dialog
    </code>
  );
}

function TypographyLead() {
  return (
    <p className="text-muted-foreground text-xl">
      A modal dialog that interrupts the user with important content and expects
      a response.
    </p>
  );
}

function TypographyLarge() {
  return <div className="text-lg font-semibold">Are you absolutely sure?</div>;
}

function TypographySmall() {
  return (
    <small className="text-sm leading-none font-medium">Email address</small>
  );
}

function TypographyMuted() {
  return (
    <p className="text-muted-foreground text-sm">Enter your email address.</p>
  );
}

function Typography() {
  return (
    <div className="space-y-6 max-w-2xl">
      <TypographyH1 />
      <TypographyLead />
      <TypographyH2 />
      <TypographyP />
      <TypographyBlockquote />
      <TypographyH3 />
      <TypographyList />
      <TypographyH4 />
      <TypographyTable />
      <TypographyInlineCode />
      <TypographyLarge />
      <TypographySmall />
      <TypographyMuted />
    </div>
  );
}

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: () => <Typography />,
};