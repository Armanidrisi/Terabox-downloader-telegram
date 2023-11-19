# Types for the Telegram Bot API [![Deno shield](https://img.shields.io/static/v1?label=Built%20for&message=Deno&style=flat-square&logo=deno&labelColor=000&color=fff)](https://deno.land/x/telegraf_types)

[![Bot API Version](https://img.shields.io/badge/Bot%20API-v6.9-f36caf.svg?style=flat-square&logo=Telegram&labelColor=white&color=blue)](https://core.telegram.org/bots/api) [![NPM version](https://img.shields.io/npm/v/@telegraf/types?style=flat-square&logo=npm&labelColor=fff&color=c53635)](https://npmjs.com/package/@telegraf/types)

This project is a fork of [@KnorpelSenf/typegram](https://github.com/KnorpelSenf/typegram), specialised for Telegraf. Typegram is legacy, and now backported from [@grammyjs/types](https://github.com/grammyjs/types).

This fork keeps Telegram Bot API types updated for Telegraf. This project provides TypeScript types for the entire [Telegram Bot API](https://core.telegram.org/bots/api).

It contains zero bytes of executable code.

## Installation

```bash
npm install --save-dev @telegraf/types
```

## Available Types

Generally, this package just exposes a huge load of `interface`s that correspond to the **types** used throughout the Telegram Bot API.

Note that the API specification sometimes only has one name for multiple variants of a type, e.g. there are a number of different `Update`s you can receive, but they're all just called `Update`.
This package represents such types as large unions of all possible options of what an `Update` could be, such that type narrowing can work as expected on your side.
If you need to access the individual variants of an `Update`, refer to `Update.MessageUpdate` and its siblings.

In fact, this pattern is used for various types, namely:

- `Update`
- `Message`
- `CallbackQuery`
- `Chat`
- `ChatFromGetChat`
- `InlineKeyboardButton`
- `KeyboardButton`
- `MessageEntity`
- `Location`

(Naturally, when the API specification is actually modelling types to be unions (e.g. `InlineQueryResult`), this is reflected here as a union type, too.)

## Using API Response objects

The Telegram Bot API does not return just the requested data in the body of the response objects.

Instead, they are wrapped inside an object that has an `ok: boolean` status flag, indicating success or failure of the preceding API request.
This outer object is modelled in `@telegraf/types` by the `ApiResponse` type.

## Customizing `InputFile` and accessing API methods

The Telegram Bot API lets bots send files in [three different ways](https://core.telegram.org/bots/api#sending-files).
Two of those ways are by specifying a `string`—either a `file_id` or a URL.
The third option, however, is by uploading files to the server using multipart/form-data.

The first two means to send a file are already covered by the type annotations across the library.
In all places where a `file_id` or a URL is permitted, the corresponding property allows a `string`.

We will now look at the type declarations that are relevant for uploading files directly.
Depending on the code you're using the types for, you may want to support different ways to specify the file to be uploaded.
As an example, you may want to be able to make calls to `sendDocument` with an object that conforms to `{ path: string }` in order to specify the location of a local file.
(Your code is then assumed to able to translate calls to `sendDocument` and the like to multipart/form-data uploads when supplied with an object alike `{ path: '/tmp/file.txt' }` in the `document` property of the argument object.)

This library cannot automatically know what objects you want to support as `InputFile`s.

However, you can specify your own version of what an `InputFile` is throughout all affected methods and interfaces.

For instance, let's stick with our example and say that you want to support `InputFile`s of the following type.

```ts
interface MyInputFile {
  path: string;
}
```

You can then customize the types to fit your needs by passing your custom `InputFile` to the `ApiMethods` type.

```ts
import * as Telegram from "@telegraf/types";

type API = Telegram.ApiMethods<MyInputFile>;
```

You can now access all types that must respect `MyInputFile` through the `API` type:

```ts
// The utility types `Opts` and `Ret`:
type Opts<M extends keyof API> = Telegram.Opts<MyInputFile>[M];
type Ret<M extends keyof API> = Telegram.Ret<MyInputFile>[M];
```

Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

Each method returns the object that is specified by Telegram.
If you directly need to access the return type of a method, consider using `Ret<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

```ts
// The adjusted `InputMedia*` types:
type InputMedia = Telegram.InputMedia<MyInputFile>;
type InputMediaPhoto = Telegram.InputMediaPhoto<MyInputFile>;
type InputMediaVideo = Telegram.InputMediaVideo<MyInputFile>;
type InputMediaAnimation = Telegram.InputMediaAnimation<MyInputFile>;
type InputMediaAudio = Telegram.InputMediaAudio<MyInputFile>;
type InputMediaDocument = Telegram.InputMediaDocument<MyInputFile>;
```

Note that interfaces other than the ones mentioned above are unaffected by the customization through `MyInputFile`.
They can simply continue to be imported directly.

## Development

This project is written for Deno and built for Node. Running `npm prepare` runs the deno2node script to build for Node.

## Where do the types come from

They're handwritten. Typegram was started by [@KnorpelSenf](https://github.com/KnorpelSenf), who eventually used it as a starting point for [the grammY types package](https://github.com/grammyjs/types). `@telegraf/types` is based on both packages, and regularly syncs with them and the Bot API.
