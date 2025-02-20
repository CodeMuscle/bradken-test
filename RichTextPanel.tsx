import React from "react";
import styled from "styled-components";
import {
  documentToReactComponents,
  Options,
  RenderNode,
  RenderMark,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { StandardContentRenderer } from "..";
import { RichTextPanel as RichTextPanelModel } from "../../models";
import { primary, s4, s5, s6, s8, s9 } from "../Theme/selectors";

interface RichTextPanelProps extends RichTextPanelModel {
  customMarks?: RenderMark;
}

const RichTextPanel: React.FC<RichTextPanelProps> = ({
  description,
  customOptions,
  customMarks,
}) => {
  const getRichTextOptions = (
    nodes: RenderNode = {},
    marks: RenderMark = {}
  ): Options => {
    return {
      renderNode: {
        // eslint-disable-next-line react/display-name
        [BLOCKS.EMBEDDED_ENTRY]: ({ data }: any): React.ReactElement => {
          return (
            <ContentWrapper>
              <StandardContentRenderer {...data} />
            </ContentWrapper>
          );
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.PARAGRAPH]: (_: any, children: any): React.ReactElement => {
          return <ParagraphWrapper>{children}</ParagraphWrapper>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.HEADING_6]: (_: any, children: any): React.ReactElement => {
          return <h6>{children}</h6>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.HEADING_5]: (_: any, children: any): React.ReactElement => {
          return <h5>{children}</h5>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.HEADING_4]: (_: any, children: any): React.ReactElement => {
          return <h4>{children}</h4>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.HEADING_3]: (_: any, children: any): React.ReactElement => {
          return <h3>{children}</h3>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.HEADING_2]: (_: any, children: any): React.ReactElement => {
          return <h2>{children}</h2>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.HEADING_1]: (_: any, children: any): React.ReactElement => {
          return <h1>{children}</h1>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.UL_LIST]: (_: any, children: any): React.ReactElement => {
          return <UlListWrapper>{children}</UlListWrapper>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.OL_LIST]: (_: any, children: any): React.ReactElement => {
          return <OlListWrapper>{children}</OlListWrapper>;
        },

        // eslint-disable-next-line react/display-name
        [BLOCKS.QUOTE]: (_: any, children: any): React.ReactElement => {
          return <QuoteWrapper>{children}</QuoteWrapper>;
        },
        ...nodes,
      },
      renderMark: {
        // eslint-disable-next-line react/display-name
        [MARKS.BOLD]: (text: any): React.ReactNode => <strong>{text}</strong>,
        // eslint-disable-next-line react/display-name
        [MARKS.ITALIC]: (text: any): React.ReactNode => <em>{text}</em>,
        // eslint-disable-next-line react/display-name
        [MARKS.UNDERLINE]: (text: any): React.ReactNode => <u>{text}</u>,
        // eslint-disable-next-line react/display-name
        [MARKS.CODE]: (text: any): React.ReactNode => <code>{text}</code>,
        // eslint-disable-next-line react/display-name
        [MARKS.SUPERSCRIPT]: (text: any): React.ReactNode => <sup>{text}</sup>,
        // eslint-disable-next-line react/display-name
        [MARKS.SUBSCRIPT]: (text: any): React.ReactNode => <sub>{text}</sub>,
        ...(customMarks || {}),
      },
    };
  };

  return (
    <div className="richTextPanel">
      {documentToReactComponents(description, getRichTextOptions(customOptions))}
    </div>
  );
};

RichTextPanel.displayName = "RichTextPanel";

const ContentWrapper = styled.div`
  > div {
    padding: ${s4} 0 ${s6};
  }
`;

const ParagraphWrapper = styled.div`
  padding-bottom: ${s5};

  &:empty {
    display: none;
  }
`;

const QuoteWrapper = styled.div`
  border-left: 4px solid ${primary};
  padding-left: ${s6};
  margin-bottom: ${s8};
  div {
    padding: 0;
  }
`;

const UlListWrapper = styled.ul`
  padding-bottom: ${s9};
  list-style-type: square;
  @media (min-width: 992px) {
    padding: 0px 120px ${s9} ${s6};
  }

  li {
    div {
      padding: 0 0 ${s5};
    }
  }
`;

const OlListWrapper = styled.ol`
  padding-bottom: ${s9};
  @media (min-width: 992px) {
    padding: 0px 120px ${s9} ${s6};
  }

  li {
    div {
      padding: 0 0 ${s5};
    }
  }
`;

export default RichTextPanel;
