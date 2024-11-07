import { Stack, Typography } from "@mui/material";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { blogList } from "../../../types/typesBlog"; // Đảm bảo import đúng đường dẫn tới blogList

export const BlogPostShow = ({ id: string }) => {
  // Tìm bài viết dựa trên id
  const record = blogList.find((post) => post.id === id);

  if (!record) {
    return <Typography>Blog post not found</Typography>;
  }

  return (
    <Show isLoading={false}>
      <Stack gap={1}>
        <Typography variant='body1' fontWeight='bold'>
          {"ID"}
        </Typography>
        <TextField value={record.id} />

        <Typography variant='body1' fontWeight='bold'>
          {"Title"}
        </Typography>
        <TextField value={record.title} />

        <Typography variant='body1' fontWeight='bold'>
          {"Content"}
        </Typography>
        <MarkdownField value={record.content} />

        <Typography variant='body1' fontWeight='bold'>
          {"Author"}
        </Typography>
        <TextField value={record.author} />

        <Typography variant='body1' fontWeight='bold'>
          {"Date"}
        </Typography>
        <DateField value={record.date} />

        <Typography variant='body1' fontWeight='bold'>
          {"Likes"}
        </Typography>
        <TextField value={record.likes} />
      </Stack>
    </Show>
  );
};
