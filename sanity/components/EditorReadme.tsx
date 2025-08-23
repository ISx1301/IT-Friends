// /studio/EditorReadmePane.tsx
import React from 'react'
import {Box, Card, Stack, Heading, Text, Code, Inline, Badge, MenuDivider} from '@sanity/ui'

export default function EditorReadmePane() {
  return (
    <Box padding={4}>
      <Stack space={4}>
        <Heading as="h1" size={3}>Інформаційна панель</Heading>

        <Inline space={3}>
          <Badge tone="primary">Read-only</Badge>
          <Badge tone="caution">Керується з репозиторію</Badge>
        </Inline>

        <Text size={2}>
          Ця сторінка є службовою та доступна лише в адмінці Sanity Studio.
        </Text>

        <MenuDivider />

        <Heading as="h2" size={2}>Верхні та нижні відступи в секціях</Heading>
        <Text size={2}>
          Для стилізації сайту ми використовуємо Tailwind CSS <br />           
          Верхні відступи: pt-цифра  <br />
          Нижні відступи: pb-цифра  
        </Text>
        <Card radius={3}>
          <Text size={2}>
            Є два варіанти перегляду сайту: <br />
            <Badge tone="caution">1. Мобільні телефони та планшети</Badge> <br />
            <Badge tone="caution">2. Ноутбуки та компи</Badge> <br /> <br />
            Через це нам потрібно окремо задавати верхні та нижні відступи для різних пристроїв: <br /> <br />
            1. Мобільні телефони та планшети (приклад): <br />
            pt-5 pb-5 <br /> <br />
            2. Ноутбуки та компи (приклад): <br /> 
            lg:pt-5 lg:pb-5 <br /> <br />
          </Text> <br />
          <Heading as="h2" size={1}>Рядок (в залежності від розміру відступів) має виглядати ось так: <br /> <Badge tone="primary">pt-5 pb-5 lg:pt-5 lg:pb-5</Badge></Heading> <br />
          Де, за відступи на мобільній версії відповідають pt-5 pb-5, а за відступи на версії для ноутбуків lg:pt-5 lg:pb-5
        </Card>
        <Heading as="h3" size={1}>Всі можливі варіанти (розмірна сітка):</Heading>

        <Card padding={3} radius={3} tone="primary">
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '24px',
              rowGap: '8px',
              alignItems: 'start',
            }}
          >
            <Text as="div" size={2}>
              <strong>Верхні відступи (pt):</strong><br />
              pt-0 (0px, відступи відсутні)<br />
              pt-1 (4px)<br />
              pt-2 (8px)<br />
              pt-3 (12px)<br />
              pt-4 (16px)<br />
              pt-5 (20px)<br />
              pt-6 (24px)<br />
              pt-8 (32px)<br />
              pt-10 (40px)<br />
              pt-12 (48px)<br />
              pt-14 (56px)<br />
              pt-16 (64px)<br />
              pt-20 (80px)<br />
              pt-24 (96px)<br />
              pt-28 (112px)<br />
              pt-32 (128px)<br />
              pt-36 (144px)<br />
              pt-40 (160px)<br />
              pt-48 (192px)<br />
              pt-56 (224px)<br />
              pt-64 (256px)<br />
              pt-72 (288px)<br />
              pt-80 (320px)<br />
              pt-96 (384px)
            </Text>

            <Text as="div" size={2}>
              <strong>Нижні відступи (pb):</strong><br />
              pb-0 (0px, відступи відсутні)<br />
              pb-1 (4px)<br />
              pb-2 (8px)<br />
              pb-3 (12px)<br />
              pb-4 (16px)<br />
              pb-5 (20px)<br />
              pb-6 (24px)<br />
              pb-8 (32px)<br />
              pb-10 (40px)<br />
              pb-12 (48px)<br />
              pb-14 (56px)<br />
              pb-16 (64px)<br />
              pb-20 (80px)<br />
              pb-24 (96px)<br />
              pb-28 (112px)<br />
              pb-32 (128px)<br />
              pb-36 (144px)<br />
              pb-40 (160px)<br />
              pb-48 (192px)<br />
              pb-56 (224px)<br />
              pb-64 (256px)<br />
              pb-72 (288px)<br />
              pb-80 (320px)<br />
              pb-96 (384px)
            </Text>
          </Box>
        </Card>
        <MenuDivider />
      </Stack>
    </Box>
  )
}
