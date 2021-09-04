import Head from 'next/head'
import styles from '../styles/Editor.module.scss'
import { PageBuilder } from '../editor/PageBuilder';
import { DraggableChoiceList } from '../editor/DraggableChoiceList';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { initializeStore } from '../state/store';
import { useEditionState, useFillable } from '../state/selectors';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../state/creator';
import { useCallback } from 'react';
import TopAppBar from '../editor/TopAppBar';
import { useState } from 'react';
import { Initializer } from '../ui/Initializer';
import { ExtendedFieldMetaEditor } from '../editor/FieldExtendedFieldMetaEditor';
import { PageComposition } from '../editor/PageComposition';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function EditorScreen() {
  const [activeTab, setActiveTab] = useState("choices");

  const fillable = useFillable();
  const edition = useEditionState();
  const dispatch = useDispatch();

  const moveToPage = useCallback((id: string) => {
    dispatch(setActivePage(id));
  }, [dispatch]);

  const activePage = useMemo(() => {
    return fillable.pages.find((p) => p.key === edition.activePage)
  }, [edition.activePage, fillable]);

  useEffect(() => {
    moveToPage(fillable.pages[0].key);
  }, [])

  return (
    <Initializer redirectToSignin>
      <DndProvider backend={HTML5Backend}>
      <div className={styles.page}>
        <Head>
          <title>Editeur de schémas</title>
          <meta name="description" content="Editeur de schémas Polyfill" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
          <TopAppBar />
        </header>
        <main className={styles.main}>
          <div className={styles.composition}>
            <PageComposition />
          </div>
          <section className={styles.base_wrapper}>
            <div className={styles.page_builder}>
              {
                activePage && <PageBuilder page={activePage} />
              }
            </div>
          </section>
          <section className={styles.details_wrapper}>
            <div className={styles.tabs_details}>
              <div className={styles.tab} data-active={activeTab === "choices"} onClick={() => setActiveTab("choices")}>
                <h5>Champs</h5>
              </div>
              <div className={styles.tab} data-active={activeTab === "edition"} onClick={() => setActiveTab("edition")}>
                <h5>Edition</h5>
              </div>
            </div>
            <div className={styles.tab_content}>
              {
                activeTab === "edition" &&
                <ExtendedFieldMetaEditor />
              }
              {
                activeTab === "choices" &&
                <DraggableChoiceList />
              }
            </div>
          </section>
        </main>
      </div>
      </DndProvider>
    </Initializer>
  )
}

export function getServerSideProps() {
  let initial = initializeStore(undefined);
  return { props: { initialReduxState: initial.getState() } };
}